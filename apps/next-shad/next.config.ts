import { readFileSync } from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import { createSecureHeaders } from 'next-secure-headers'
import pc from 'picocolors'
import nextI18nConfig from './next-i18next.config.mjs'
import { buildEnv } from './src/config/build-env.config.mjs'
// import { getServerRuntimeEnv } from './src/config/server-runtime-env.config';

// import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

const workspaceRoot = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  '..',
  '..'
)

const packageJson = JSON.parse(
  readFileSync(new URL('package.json', import.meta.url).pathname, 'utf8')
)

const isProd = process.env.NODE_ENV === 'production'

if (!buildEnv.NEXT_BUILD_ENV_SOURCEMAPS) {
  console.log(
    `- ${pc.green(
      'info'
    )} Sourcemaps generation have been disabled through NEXT_BUILD_ENV_SOURCEMAPS`
  )
}

const secureHeaders = createSecureHeaders({
  contentSecurityPolicy: {
    directives:
      buildEnv.NEXT_BUILD_ENV_CSP === true
        ? {
            defaultSrc: "'self'",
            styleSrc: [
              "'self'",
              "'unsafe-inline'",
              'https://unpkg.com/@graphql-yoga/graphiql/dist/style.css',
              'https://meet.jitsi.si',
              'https://8x8.vc'
            ],
            scriptSrc: [
              "'self'",
              "'unsafe-eval'",
              "'unsafe-inline'",
              'https://unpkg.com/@graphql-yoga/graphiql'
            ],
            frameSrc: ["'self'"],
            connectSrc: [
              "'self'",
              'https://vitals.vercel-insights.com',
              'https://*.sentry.io'
            ],
            imgSrc: ["'self'", 'https:', 'http:', 'data:'],
            workerSrc: ['blob:']
          }
        : {}
  },
  ...(buildEnv.NEXT_BUILD_ENV_CSP === true && isProd
    ? {
        forceHTTPSRedirect: [
          true,
          { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true }
        ]
      }
    : {}),
  referrerPolicy: 'same-origin'
})

const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: buildEnv.NEXT_BUILD_ENV_SOURCEMAPS === true,
  i18n: nextI18nConfig.i18n,
  optimizeFonts: true,
  httpAgentOptions: {
    keepAlive: true
  },
  onDemandEntries: {
    maxInactiveAge: (buildEnv.NEXT_BUILD_ENV_CI ? 3600 : 25) * 1000
  },
  swcMinify: true,
  compiler: {},
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    loader: 'default',
    dangerouslyAllowSVG: false,
    disableStaticImages: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      }
    ],
    unoptimized: false
  },
  transpilePackages: isProd ? ['ofetch'] : [],
  ...(buildEnv.NEXT_BUILD_ENV_OUTPUT === 'standalone'
    ? { output: 'standalone', outputFileTracing: true }
    : {}),
  experimental: {
    ...(buildEnv.NEXT_BUILD_ENV_OUTPUT === 'standalone'
      ? { outputFileTracingRoot: workspaceRoot }
      : {}),
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    },
    esmExternals: true,
    externalDir: true
  },
  typescript: {
    ignoreBuildErrors: !buildEnv.NEXT_BUILD_ENV_TYPECHECK,
    tsconfigPath: buildEnv.NEXT_BUILD_ENV_TSCONFIG
  },
  eslint: {
    ignoreDuringBuilds: !buildEnv.NEXT_BUILD_ENV_LINT
  },
  async headers() {
    return [
      {
        source: '/:path((?!api).*)*',
        headers: [
          ...secureHeaders,
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' }
        ]
      }
    ]
  },
  async rewrites() {
    return []
  },
  webpack: (config, { webpack, isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { ...config.resolve.fallback, fs: false }
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: buildEnv.NEXT_BUILD_ENV_SENTRY_DEBUG,
        __SENTRY_TRACING__: buildEnv.NEXT_BUILD_ENV_SENTRY_TRACING
      })
    )

    // if (isServer) {
    //   config.plugins.push(new PrismaPlugin());
    // }

    const fileLoaderRule = config.module.rules.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (rule: any) => rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      { ...fileLoaderRule, test: /\.svg$/i, resourceQuery: /url/ },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack']
      }
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  env: {
    APP_NAME: packageJson.name ?? 'not-in-package.json',
    APP_VERSION: packageJson.version ?? 'not-in-package.json',
    BUILD_TIME: new Date().toISOString()
  }
}

export default nextConfig

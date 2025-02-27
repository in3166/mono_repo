## 패키지 및 명려어

- `apps` 내의 프로젝트 실행하기

  ```bash
  pnpm --filter react-vite dev
  ```

- **Syncpack**: Monorepo에서 각 프로젝트의 패키지 의존성 버전을 정리하고 일관성을 유지

  ```bash
  # 패키지 버전 문제 확인
  pnpm syncpack list-mismatches

  # 패키지 버전 자동 정리
  pnpm syncpack fix-mismatches

  # package.json 정리 및 정렬
  pnpm syncpack format
  ```

## 파일

.npmrc → npm 설정 파일.
.nvmrc → Node.js 버전 관리 파일.
.syncpackrc.cjs → Syncpack 설정 파일 (패키지 버전 동기화 도구).
cache.config.js → Turbo 빌드 캐시 관련 설정.
CHANGELOG.md → 프로젝트 변경 내역 기록.
commitlint.config.js → Commitlint 설정 파일 (커밋 메시지 규칙 적용).
constraints.pro → 특정 제한 조건을 설정하는 파일(정확한 용도는 내부 확인 필요).
lint-staged.common.js / lint-staged.config.js → Lint-staged 설정 (Git 커밋 전에 특정 파일만 린트 실행).
renovate.json5 → Renovate(자동 패키지 업데이트 도구) 설정 파일.

CODE_OF_CONDUCT.md → 오픈소스 프로젝트에서 준수할 행동 강령.
TROUBLESHOOT.md → 프로젝트의 문제 해결 가이드.
CONTRIBUTING.md → 프로젝트 기여 방법 문서.

## Install

```bash
corepack enable
yarn install
```

## Structure

```
.
├── apps
│   ├── nextjs-app  (i18n, ssr, api, vitest)
│   └── vite-app
└── packages
    ├── common-i18n         (locales...)
    ├── core-lib
    ├── db-main-prisma
    ├── eslint-config-bases (to shared eslint configs)
    └── ui-lib              (emotion, storybook)
```

#### Example apps

- [apps/nextjs-app](./apps/nextjs-app): SSR, i18n, tailwind v3, emotion, graphQL, rest... [README](./apps/nextjs-app/README.md) | [DEMO/Vercel](https://monorepo-nextjs-app.vercel.app) | [CHANGELOG](./apps/nextjs-app/CHANGELOG.md)
- [apps/vite-app](./apps/vite-app): Basic vite-app. [README](./apps/vite-app/README.md) | [DEMO/Vercel](https://monorepo-vite-app.vercel.app) | [CHANGELOG](./apps/vite-app/CHANGELOG.md)

> Apps should not depend on apps, they can depend on packages

#### Example shared packages

- [packages/core-lib](./packages/core-lib): publishable. [README](./packages/core-lib/README.md) | [CHANGELOG](./packages/core-lib/CHANGELOG.md)
- [packages/db-main-prisma](./packages/db-main-prisma): used by web-app. [README](./packages/db-main-prisma/README.md) | [CHANGELOG](./packages/db-main-prisma/CHANGELOG.md)
- [packages/eslint-config-bases](./packages/eslint-config-bases): [README](./packages/eslint-config-bases/README.md) | [CHANGELOG](./packages/eslint-config-bases/CHANGELOG.md)
- [packages/ui-lib](./packages/ui-lib): publishable. [README](./packages/ui-lib/README.md) | [CHANGELOG](./packages/ui-lib/CHANGELOG.md)
- [packages/common-i18n](./packages/common-i18n): [README](./packages/common-i18n/README.md) | [CHANGELOG](./packages/common-i18n/CHANGELOG.md)

> Apps can depend on packages, packages can depend on each others...

#### Folder overview

<details>
<summary>Detailed folder structure</summary>

```
.
├── apps
│   ├── vite-app                 (Vite app as an example)
│   │   ├── src/
│   │   ├── package.json         (define package workspace:package deps)
│   │   └── tsconfig.json        (define path to packages)
│   │
│   └── nextjs-app                  (NextJS app with api-routes)
│       ├── e2e/                 (E2E tests with playwright)
│       ├── public/
│       ├── src/
│       │   └── pages/api        (api routes)
│       ├── CHANGELOG.md
│       ├── next.config.mjs
│       ├── package.json         (define package workspace:package deps)
│       ├── tsconfig.json        (define path to packages)
│       └── vitest.config.ts
│
├── packages
│   ├── core-lib                 (basic ts libs)
│   │   ├── src/
│   │   ├── CHANGELOG.md
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── db-main-prisma          (basic db layer with prisma)
│   │   ├── e2e/                (E2E tests)
│   │   ├── prisma/
│   │   ├── src/
│   │   ├── CHANGELOG.md
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── eslint-config-bases
│   │   ├── src/
│   │   ├── CHANGELOG.md
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── ui-lib                  (basic design-system in react)
│       ├── src/
│       ├── CHANGELOG.md
│       ├── package.json
│       └── tsconfig.json
│
├── static                       (no code: images, json, locales,...)
│   ├── assets
│   └── locales
├── docker                       (docker...)
│   ├── .dockerignore
│   ├── docker-compose.yml       (compose specific for nextjs-app)
│   ├── docker-compose.db.yml    (general services like postgresql...)
│   └── Dockerfile               (multistage build for nextjs-app)
├── .yarnrc.yml
├── package.json                 (the workspace config)
└── tsconfig.base.json           (base typescript config)
```

</details>

## Howto

### 1. Enable workspace support

<details>
<summary>Root package.json with workspace directories</summary>

```json5
{
  "name": "nextjs-monorepo-example",
  // Set the directories where your apps, packages will be placed
  "workspaces": ["apps/*", "packages/*"],
  //...
}
```

_The package manager will scan those directories and look for children `package.json`. Their
content is used to define the workspace topology (apps, libs, dependencies...)._

</details>

### 2. Create a new package

Create a folder in [./packages/](./packages) directory with the name of
your package.

<details>
   <summary>Create the package folder</summary>

```bash
mkdir packages/magnificent-poney
mkdir packages/magnificent-poney/src
cd packages/magnificent-poney
```

</details>

Initialize a package.json with the name of your package.

> Rather than typing `yarn init`, prefer to take the [./packages/ui-lib/package.json](./packages/ui-lib/package.json)
> as a working example and edit its values.

<details>
<summary>Example of package.json</summary>

```json5
{
  "name": "@ijyu-3166/magnificent-poney",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "clean": "rimraf ./tsconfig.tsbuildinfo",
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "typecheck": "tsc --project ./tsconfig.json --noEmit",
    "test": "run-s 'test:*'",
    "test:unit": "echo \"No tests yet\"",
    "fix:staged-files": "lint-staged --allow-empty",
    "fix:all-files": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
  },
  "devDependencies": {
    "@ijyu-3166/eslint-config-bases": "workspace:^",
  },
}
```

</details>

### 3. Using the package in app

#### Step 3.1: package.json

First add the package to the app package.json. The recommended way is to
use the [workspace protocol](https://yarnpkg.com/features/protocols#workspace) supported by
yarn and pnpm.

```bash
cd apps/my-app
yarn add @ijyu-3166/magnificent-poney@'workspace:^'
```

Inspiration can be found in [apps/nextjs-app/package.json](./apps/nextjs-app/package.json).

<details>
<summary>package.json</summary>

```json5
{
  "name": "my-app",
  "dependencies": {
    "@ijyu-3166/magnificient-poney": "workspace:^",
  },
}
```

</details>

#### Step 3.2: In tsconfig.json

Then add a typescript path alias in the app tsconfig.json. This
will allow you to import it directly (no build needed)

Inspiration can be found in [apps/nextjs-app/tsconfig.json](./apps/nextjs-app/tsconfig.json).

<details>
  <summary>Example of tsonfig.json</summary>

```json5
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      // regular app aliases
      "@/components/*": ["./components/*"],
      // packages aliases, relative to app_directory/baseUrl
      "@ijyu-3166/magnificent-poney/*": [
        "../../../packages/magnificent-poney/src/*",
      ],
      "@ijyu-3166/magnificent-poney": [
        "../../../packages/magnificent-poney/src/index",
      ],
    },
  },
}
```

> PS:
>
> - Don't try to set aliases in the global tsonfig.base.json to keep strict with
>   graph dependencies.
> - The **star** in `@ijyu-3166/magnificent-poney/*` allows you to import subfolders. If you use
>   a barrel file (index.ts), the alias with star can be removed.

</details>

#### Step 3.3: Next config

Edit your `next.config.mjs` and enable the [experimental.externalDir option](https://github.com/vercel/next.js/pull/22867).
Feedbacks [here](https://github.com/vercel/next.js/discussions/26420).

```js
const nextConfig = {
  experimental: {
    externalDir: true,
  },
};
```

<details>
  <summary>Using a NextJs version prior to 10.2.0 ?</summary>

If you're using an older NextJs version and don't have the experimental flag, you can simply override your
webpack config.

```js
const nextConfig = {
  webpack: (config, { defaultLoaders }) => {
    // Will allow transpilation of shared packages through tsonfig paths
    // @link https://github.com/vercel/next.js/pull/13542
    const resolvedBaseUrl = path.resolve(config.context, "../../");
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(tsx|ts|js|jsx|json)$/,
        include: [resolvedBaseUrl],
        use: defaultLoaders.babel,
        exclude: (excludePath) => {
          return /node_modules/.test(excludePath);
        },
      },
    ];
    return config;
  },
};
```

</details>

> PS: If your shared package make use of scss bundler... A custom webpack configuration will be necessary
> or use [next-transpile-modules](https://github.com/martpie/next-transpile-modules), see FAQ below.

#### Step 3.4: Using the package

The packages are now linked to your app, just import them like regular packages: `import { poney } from '@ijyu-3166/magnificent-poney'`.

### 4. Publishing

> Optional

If you need to share some packages outside of the monorepo, you can publish them to npm or private repositories.
An example based on microbundle is present in each package. Versioning and publishing can be done with [atlassian/changeset](https://github.com/atlassian/changesets),
and it's simple as typing:

```bash
$ yarn g:changeset
```

Follow the instructions... and commit the changeset file. A "Version Packages" P/R will appear after CI checks.
When merging it, a [github action](./.github/workflows/release-or-version-pr.yml) will publish the packages
with resulting semver version and generate CHANGELOGS for you.

> PS:
>
> - Even if you don't need to publish, changeset can maintain an automated changelog for your apps. Nice !
> - To disable automatic publishing of some packages, just set `"private": "true"` in their package.json.
> - Want to tune the behaviour, see [.changeset/config.json](./.changeset/config.json).

## 4. Monorepo essentials

### Monorepo scripts

Some convenience scripts can be run in any folder of this repo and will call their counterparts defined in packages and apps.

| Name                         | Description                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `yarn g:changeset`           | Add a changeset to declare a new version                                              |
| `yarn g:codegen`             | Run codegen in all workspaces                                                         |
| `yarn g:typecheck`           | Run typechecks in all workspaces                                                      |
| `yarn g:lint`                | Display linter issues in all workspaces                                               |
| `yarn g:lint --fix`          | Attempt to run linter auto-fix in all workspaces                                      |
| `yarn g:lint-styles`         | Display css stylelint issues in all workspaces                                        |
| `yarn g:lint-styles --fix`   | Attempt to run stylelint auto-fix issues in all workspaces                            |
| `yarn g:test`                | Run unit and e2e tests in all workspaces                                              |
| `yarn g:test-unit`           | Run unit tests in all workspaces                                                      |
| `yarn g:test-e2e`            | Run e2e tests in all workspaces                                                       |
| `yarn g:build`               | Run build in all workspaces                                                           |
| `yarn g:clean`               | Clean builds in all workspaces                                                        |
| `yarn g:check-dist`          | Ensure build dist files passes es2017 (run `g:build` first).                          |
| `yarn g:check-size`          | Ensure browser dist files are within size limit (run `g:build` first).                |
| `yarn clean:global-cache`    | Clean tooling caches (eslint, jest...)                                                |
| `yarn deps:check --dep dev`  | Will print what packages can be upgraded globally (see also [.ncurc.yml](.ncurc.yml)) |
| `yarn deps:update --dep dev` | Apply possible updates (run `yarn install && yarn dedupe` after)                      |
| `yarn install:playwright`    | Install playwright for e2e                                                            |
| `yarn dedupe`                | Built-in yarn deduplication of the lock file                                          |

> Why using `:` to prefix scripts names ? It's convenient in yarn 3+, we can call those scripts from any folder in the monorepo.
> `g:` is a shortcut for `global:`. See the complete list in [root package.json](./package.json).

### Maintaining deps updated

The global commands `yarn deps:check` and `yarn deps:update` will help to maintain the same versions across the entire monorepo.
They are based on the excellent [npm-check-updates](https://github.com/raineorshine/npm-check-updates)
(see [options](https://github.com/raineorshine/npm-check-updates#options), i.e: `yarn check:deps -t minor`).

> After running `yarn deps:update`, a `yarn install` is required. To prevent
> having duplicates in the yarn.lock, you can run `yarn dedupe --check` and `yarn dedupe` to
> apply deduplication. The duplicate check is enforced in the example github actions.

## 5. Quality

### 5.1 Linters

See an example in [./apps/nextjs-app/.eslintrc.js](./apps/nextjs-app/.eslintrc.js) and our
[eslint-config-bases](./packages/eslint-config-bases/README.md).

### 5.2 Hooks / Lint-staged

Check the [.husky](./.husky) folder content to see what hooks are enabled. Lint-staged is used to guarantee
that lint and prettier are applied automatically on commit and/or pushes.

```bash
<type>(<scope>): <subject>

<body> (선택 사항)

<footer> (선택 사항)
```

- Header

  - type: 소문자, (build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test, translation, security)
  - scope: 소문자, 변경이 적용된 코드 범위 (auth, ui, api 등)
  - subject: 마침표 x, Sentence-case(첫 글자만 대문자), Start-case(모든 단어의 첫 글자 대문자), Pascal-case(단어를 대문자로 시작하고 이어 붙임), Upper-case(모두 대문자)
  - 위 항목은 100자 이내

- Body

  - 빈 줄로 시작
  - 각 줄은 100자 이내
  - 변경 사항에 대한 추가 설명

- Footer

  - 빈 줄로 시작
  - 각 줄은 100자 이내
  - 참조 정보 추가 (JIRA, 티켓, 이슈 번호)

- `git commit --edit`

```base
# 예시
fix(auth): correct token expiration handling

This fixes the token renewal process when it expires after 1 hour.

Resolves: #123
```

### 5.3 Tests

Tests relies on ts-jest or vitest depending on the app. All setups supports typescript path aliases.
React-testing-library is enabled whenever react is involved.

Configuration lives in the root folder of each apps/packages. As an
example see

- [./apps/nextjs-app/vitest.config.ts](./apps/nextjs-app/vitest.config.ts).

### 5.4 CI

You'll find some example workflows for github action in [.github/workflows](./.github/workflows).
By default, they will ensure that

- You don't have package duplicates.
- You don't have typecheck errors.
- You don't have linter / code-style errors.
- Your test suite is successful.
- Your apps (nextjs) or packages can be successfully built.
- Basic check-size example in nextjs-app.

Each of those steps can be opted-out.

To ensure decent performance, those features are present in the example actions:

- **Caching** of packages (node_modules...) - install around 25s
- **Caching** of nextjs previous build - built around 20s
- **Triggered when changed** using [actions paths](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#onpushpull_requestpaths), ie:

  > ```
  >  paths:
  >    - "apps/nextjs-app/**"
  >    - "packages/**"
  >    - "package.json"
  >    - "tsconfig.base.json"
  >    - "yarn.lock"
  >    - ".yarnrc.yml"
  >    - ".github/workflows/**"
  >    - ".eslintrc.base.json"
  >    - ".eslintignore"
  > ```

<br />

### Monorepo

#### ✅ 장점 (Benefits)

1. 코드 재사용 용이성
   ✅ 공유 라이브러리(예: api, shared ui, locales, images 등)를 쉽게 분리하고 여러 애플리케이션에서 사용할 수 있습니다.
   ✅ 별도의 Git 저장소에서 개별적으로 버전 관리, 테스트, 배포할 필요 없이 한 곳에서 관리할 수 있습니다.
   ✅ 개발 시간이 부족할 때 중복 코드를 생성하는 경향을 줄여줍니다.

2. 원자적 커밋 (Atomic commits)
   ✅ 여러 개의 프로젝트가 별도 저장소에 있을 경우, 어떤 버전이 서로 호환되는지 동기화해야 하는 문제가 발생합니다.
   ✅ Monorepo에서는 CI, 샌드박스 환경, 릴리즈 관리가 더 쉬워집니다 (예: 의존성 지옥).
   ✅ 하나의 Pull Request에서 모든 변경 사항을 포함할 수 있어, 여러 패키지 버전을 조정하며 테스트할 필요가 없습니다.

3. 코드 리팩토링 용이성
   ✅ 특정 라이브러리를 수정하면 이를 사용하는 모든 앱과 패키지에 즉시 반영됩니다.
   ✅ TypeScript 타입 검사, 테스트, CI, 샌드박스 환경을 통해 변경 사항의 영향을 쉽게 파악할 수 있습니다.
   ✅ 기술 부채(tech debt) 발생을 줄이며, 의존하는 코드까지 함께 리팩토링하도록 유도합니다.

4. 팀 간 협업 강화
   ✅ 코드 일관성 유지, 린터 적용, 코드 발견 용이성, 중복 방지 등의 요소가 협업을 개선하는 데 기여합니다.

#### ❌ 단점 (Drawbacks)

1. 빌드 시간 증가
   ✅ 일반적으로 문제가 될 수 있지만, Next.js/Webpack 5, TypeScript 경로 별칭, Yarn을 사용하면 큰 문제가 되지 않습니다.
   ✅ 의존성을 다시 빌드할 필요가 없으며, 수정된 파일만 캐시를 활용해 포함되므로 성능 최적화가 가능합니다.

2. 버전 관리 및 패키지 배포
   ✅ Monorepo 외부에서 공유 라이브러리를 사용하려면 버전 관리 및 배포가 복잡해질 수 있습니다.
   ✅ Atlassian Changeset 사용을 고려할 수 있으며, 이 프로젝트에서는 해당 문제가 중요하지 않습니다.

3. Git 저장소 크기 증가
   ✅ Monorepo 내 모든 패키지, 애플리케이션, 변경 이력이 한 저장소에 포함되므로 Git 저장소 크기가 커질 수 있습니다.
   ✅ 문제가 발생하면 이미지 등의 정적 자산을 분리하거나, 더 이상 변경되지 않는 패키지는 별도 저장소로 이동하는 것이 좋습니다.

4. 다양한 프로그래밍 언어 지원 어려움
   ✅ 여러 언어(PHP, Ruby, Java, Node 등)를 포함하는 Monorepo는 적절한 도구(Bazel 등)가 부족하여 설정이 어렵습니다.
   ✅ 일반적으로 하나의 스택(Node, TypeScript 등) 을 사용하며, 동일한 패키지 매니저(Yarn, pnpm 등)로 관리하는 것이 이상적입니다.

#### 📌 정확한 버전 고정 vs Semver 버전 사용

애플리케이션의 dependencies 및 devDependencies는 정확한 버전(Exact Version) 으로 고정합니다.
패키지(packages/\*)의 의존성은 Semver(범위 지정 버전, ^, ~ 등) 을 사용하여 유연하게 관리합니다.
자세한 이유는 여기에서 확인할 수 있으며,

프로젝트 내 renovate.json5 설정 파일을 참고하세요.

✅ 의존성 최신 상태 유지 방법

yarn deps:check && yarn deps:update 스크립트를 사용하거나,
Renovatebot과 같은 자동 업데이트 도구를 활용하세요.

```bash
# 의존성 상태 확인
pnpm outdated

# 업데이트 가능한 패키지 목록 확인
pnpm update --latest

# package.json을 유지하면서 patch 또는 minor만 업데이트
pnpm update

# 특정 패키지만 업데이트
pnpm update react
```

#### 🛠 Yarn으로 의존성 추가 시 정확한 버전 고정 방법

Yarn CLI로 패키지를 추가할 때 기본적으로 --exact 옵션을 적용할 수 있습니다.
이를 위해 yarnrc.yml 파일에서 defaultSemverRangePrefix: "" 설정을 변경할 수 있습니다.

하지만, 이는 Monorepo 내 모든 패키지(packages/\*)에도 영향을 미칠 수 있습니다.
따라서, yarn add something --exact을 개별적으로 지정하는 것이 더 적절한 방법입니다.

#### 📌 Renovate와 PR(GitHub Pull Request)

- Renovate는 Git PR을 자동으로 생성하는 도구입니다.
- 즉, 프로젝트의 dependencies가 오래되었을 경우, 자동으로 패키지를 업데이트하고 PR(Pull Request)을 생성하여 코드 변경을 제안합니다.

```
🔄 Renovate의 동작 방식
1️⃣ 프로젝트의 의존성 분석

renovate.json5 설정을 읽고, package.json, pnpm-lock.yaml 등의 패키지를 스캔하여 오래된 의존성을 찾음.
2️⃣ 업데이트 가능한 패키지 확인

pnpm outdated와 유사한 작업 수행.
SemVer 정책을 기반으로 patch, minor, major 버전을 구분.
3️⃣ 자동으로 패키지 업데이트

pnpm update --latest 또는 특정 버전으로 패키지를 업데이트.
4️⃣ PR(Pull Request) 생성

업데이트된 package.json과 pnpm-lock.yaml을 포함한 자동 PR을 생성하여 검토할 수 있도록 함.
제목 예시: "chore(deps): update react to 18.3.0"
PR 설명에는 변경된 패키지 목록과 영향도를 제공.
5️⃣ CI/CD 테스트 & 병합 (Merge)
```

PR을 생성하면 GitHub Actions, Jenkins, GitLab CI/CD 등의 자동 테스트가 실행됨.
문제가 없다면 PR을 병합(merge)하여 업데이트를 적용.

##### 📌 PR 생성 예제 (Renovate가 만든 PR 예시)

PR 제목:
`chore(deps): update dependency react to v18.3.0`

PR 내용:
`React를 18.2.0 → 18.3.0으로 업데이트합니다.`

```
기존 버전: react@18.2.0
새로운 버전: react@18.3.0
변경사항 참고: React 18.3.0 Release Notes
```

- 자동으로 업데이트했으며, 테스트가 통과하면 안전하게 병합할 수 있습니다.

const CHUNK_PUBLIC_PATH = "server/pages/_document.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/08b5e__pnpm_4451bc._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__857317._.js");
runtime.loadChunk("server/chunks/ssr/[externals]_path_3f5f23._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/apps/next-shad/src/pages/_document.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;

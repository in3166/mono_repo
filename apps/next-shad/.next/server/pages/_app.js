const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__070890._.js");
runtime.loadChunk("server/chunks/ssr/[project]__3d039a._.css");
runtime.loadChunk("server/chunks/ssr/[externals]_path_984761._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/apps/next-shad/src/pages/_app.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;

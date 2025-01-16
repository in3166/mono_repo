(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__6876c3._.js", {

"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[project]/apps/next-shad/src/middleware.ts [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// @link https://nextjs.org/docs/app/building-your-application/routing/middleware
__turbopack_esm__({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$15$2e$1$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$1_5ama4xyp6745qifvs3fh2z6bhi$2f$node_modules$2f$next$2d$auth$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next-auth@4.24.11_next@15.1.4_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@1_5ama4xyp6745qifvs3fh2z6bhi/node_modules/next-auth/middleware.js [middleware] (ecmascript)");
;
const config = {
    matcher: [
        '/admin/:path*'
    ]
};
const adminAuthRoutes = [
    '/admin/:path*'
];
const isAdminRoute = (pathName, adminRoutes)=>{
    return adminRoutes.some((routePrefix)=>{
        const path = pathName.toLowerCase().trim();
        if (routePrefix.endsWith(':path*')) {
            return pathName.startsWith(routePrefix.slice(0, -7));
        }
        return path === routePrefix;
    });
};
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$11_next$40$15$2e$1$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$1_5ama4xyp6745qifvs3fh2z6bhi$2f$node_modules$2f$next$2d$auth$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["withAuth"])({
    callbacks: {
        authorized: ({ req, token })=>{
            const { pathname } = req.nextUrl;
            return !isAdminRoute(pathname, adminAuthRoutes) || token?.role === 'admin';
        }
    }
});
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__6876c3._.js.map
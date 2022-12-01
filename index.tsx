import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
//后缀名与content-type的映射
const contentTypeMap = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".wasm": "application/wasm",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
};

//根据前端的要求，生成某个目录下的readme.md描述并返回

async function handleRequest(request: Request): Promise<Response> {
  let { pathname } = new URL(request.url);
  if (pathname === "/") {
    pathname = "/index.html";
  }
  pathname = "./" + decodeURIComponent(pathname);
  const ext = pathname.substring(pathname.lastIndexOf(".")).toLowerCase();
  const responseProps = {
    headers: { "content-type": contentTypeMap[ext] ?? contentTypeMap["txt"] },
  };
  try {
    const file = await Deno.readFile(pathname);
    return new Response(file, responseProps);
  } catch (error) {
    console.log(error);
    return new Response(`<h1>404 Not Found</h1>`, { status: 404 });
  }
}

serve(handleRequest);

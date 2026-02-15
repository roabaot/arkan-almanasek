import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "mh_request_token";

type RouteContext = { params: Promise<{ path: string[] }> };

function getApiBaseUrl() {
  const base =
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.NEXT_API_BASE_URL;

  if (!base) {
    throw new Error(
      "Missing API_BASE_URL (or NEXT_PUBLIC_API_BASE_URL). Define it in your environment.",
    );
  }

  return base.replace(/\/+$/, "");
}

function buildTargetUrl(req: NextRequest, pathParts: string[]) {
  const path = `/${pathParts.join("/")}`.replace(/\/+$/, "");
  const search = req.nextUrl.search;
  return `${getApiBaseUrl()}${path}${search}`;
}

async function handler(req: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  const urlObj = new URL(buildTargetUrl(req, path));

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");

  const token = req.cookies.get(COOKIE_NAME)?.value;

  // Ruby API expects token as query param for request-scoped endpoints.
  if (token && path?.[0] === "requests" && !urlObj.searchParams.has("token")) {
    urlObj.searchParams.set("token", token);
  }

  if (token) {
    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("X-Request-Token", token);
  }

  const method = req.method.toUpperCase();
  const hasBody = !(method === "GET" || method === "HEAD");
  const body = hasBody ? await req.arrayBuffer() : undefined;

  const upstreamRes = await fetch(urlObj.toString(), {
    method,
    headers,
    body,
    redirect: "manual",
    cache: "no-store",
  });

  const resHeaders = new Headers(upstreamRes.headers);
  resHeaders.delete("set-cookie");

  return new NextResponse(upstreamRes.body, {
    status: upstreamRes.status,
    headers: resHeaders,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;

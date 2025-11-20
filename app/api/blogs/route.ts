import { NextRequest } from "next/server";
import { getBlogs } from "@/app/[locale]/actions/blogs";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // Accept both legacy flat `search` and new nested-style `filter_by[search]` query param
    const search = searchParams.get("filter_by[search]") || undefined;
    const page = searchParams.get("page") || undefined;
    const per_page = searchParams.get("per_page") || undefined;

    const { items, meta } = await getBlogs({
      search,
      page: page ? Number(page) : undefined,
      per_page: per_page ? Number(per_page) : undefined,
      noStore: true,
      debug: false,
    });

    return new Response(JSON.stringify({ items, meta }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[api/blogs] error", err);
    return new Response(
      JSON.stringify({ items: [], meta: {}, error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

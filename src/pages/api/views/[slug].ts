// src/pages/api/views/[slug].ts
import type { APIRoute } from "astro";
import { sanityWriteClient } from "@/lib/sanity.server";

export const POST: APIRoute = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // 1. Fetch document ID by slug
    const post = await sanityWriteClient.fetch(
      `*[_type == "post" && slug.current == $slug][0]._id`,
      { slug },
    );

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Increment views field in Sanity
    const updated = await sanityWriteClient
      .patch(post)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    return new Response(
      JSON.stringify({ success: true, views: updated.views }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("Failed to log view in Sanity:", err);
    return new Response(JSON.stringify({ error: "Failed to log view" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

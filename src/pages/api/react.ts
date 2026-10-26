// src/pages/api/react.ts
import type { APIRoute } from "astro";
import { sanityWriteClient } from "@/lib/sanity.server";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { postId } = await request.json();

    if (!postId) {
      return new Response(JSON.stringify({ error: "postId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Atomically increment claps count in Sanity
    const updated = await sanityWriteClient
      .patch(postId)
      .setIfMissing({ claps: 0 })
      .inc({ claps: 1 })
      .commit();

    return new Response(
      JSON.stringify({ success: true, claps: updated.claps }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("Failed to update claps in Sanity:", err);
    return new Response(
      JSON.stringify({ error: "Failed to record reaction" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

// src/lib/sanity.server.ts
import { createClient } from "@sanity/client";

export const sanityWriteClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  token: import.meta.env.SANITY_WRITE_TOKEN, // Set in your .env file
  useCdn: false, // Must be false for real-time mutations
  apiVersion: "2024-01-01",
});

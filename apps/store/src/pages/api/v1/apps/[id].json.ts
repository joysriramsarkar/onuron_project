import type { APIContext } from "astro";
import { getApp, loadApps } from "../../../../lib/registry";

export function getStaticPaths() {
  return loadApps().map((a) => ({ params: { id: a.id } }));
}

export async function GET({ params }: APIContext) {
  const app = getApp(params.id as string);
  if (!app) {
    return new Response(JSON.stringify({ error: "not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return Response.json(app);
}

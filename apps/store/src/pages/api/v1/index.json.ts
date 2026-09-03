import { loadApps } from "../../../lib/registry";

export async function GET() {
  return Response.json({
    feed: 1,
    updated: new Date().toISOString(),
    apps: loadApps(),
  });
}

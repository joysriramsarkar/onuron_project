import fs from "node:fs";
import path from "node:path";
import type { AppManifest } from "@onuron/store-schema";

function getRegistryPath() {
  const direct = path.join(process.cwd(), "public/registry/apps");
  if (fs.existsSync(direct)) return direct;
  const nested = path.join(process.cwd(), "apps/store/public/registry/apps");
  if (fs.existsSync(nested)) return nested;
  return direct;
}

export function loadApps(): AppManifest[] {
  const REGISTRY = getRegistryPath();
  if (!fs.existsSync(REGISTRY)) return [];

  return fs
    .readdirSync(REGISTRY, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const manifestPath = path.join(REGISTRY, d.name, "manifest.json");
      if (!fs.existsSync(manifestPath)) return null;

      const m = JSON.parse(
        fs.readFileSync(manifestPath, "utf8")
      ) as AppManifest;

      m.media.iconUrl = `/registry/apps/${d.name}/${m.media.icon}`;
      m.media.screenshotUrls = (m.media.screenshots ?? []).map(
        (s) => `/registry/apps/${d.name}/${s}`
      );
      return m;
    })
    .filter((m): m is AppManifest => m !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getApp(id: string): AppManifest | undefined {
  return loadApps().find((a) => a.id === id);
}

export function formatBytes(n: number): string {
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

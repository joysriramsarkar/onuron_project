const isDev = import.meta.env.DEV;

export const ECOSYSTEM_URLS = {
  main: isDev ? "http://localhost:4321" : "https://onuron.org",
  os: isDev ? "http://localhost:4322" : "https://os.onuron.org",
  alap: isDev ? "http://localhost:4323" : "https://alap.onuron.org",
  nil: isDev ? "http://localhost:4324" : "https://nil.onuron.org",
  store: isDev ? "http://localhost:4325" : "https://store.onuron.org",
  docs: isDev ? "http://localhost:4326" : "https://docs.onuron.org",
};

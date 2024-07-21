export const devices = ["desktop", "mobile"] as const;
export type Device = typeof devices[number];

export const appConfig = {
  appName: "Express Scraper API",
  devices
}

export const scrapingOptions = ({
  url,
  locale = "en",
  device = "desktop",
  timeout = 6_000
}: {
  url: string;
  locale?: string;
  device?: Device;
  timeout?: number;
}) => {
  const options: any = {
    url,
    timeout: { request: timeout },
    headerGeneratorOptions: {
      locales: [locale],
      device: [device]
    }
  }
  // local dev proxy
  if (process.env.DEV_PROXYY) {
    options["proxyUrl"] = process.env.DEV_PROXYY;
  }

  // Production proxy
  if (process.env.HTTP_PROXYY) {
    options["proxyUrl"] = process.env.HTTP_PROXYY;
  }
  return options
}
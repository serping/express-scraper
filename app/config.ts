export const devices = ["desktop", "mobile"] as const;
export type Device = typeof devices[number];

export const appConfig = {
  appName: "Express Scraper",
  devices
}
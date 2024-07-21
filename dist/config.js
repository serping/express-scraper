"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// app/config.ts
var config_exports = {};
__export(config_exports, {
  appConfig: () => appConfig,
  devices: () => devices,
  scrapingOptions: () => scrapingOptions
});
module.exports = __toCommonJS(config_exports);
var devices = ["desktop", "mobile"];
var appConfig = {
  appName: "Express Scraper API",
  devices
};
var scrapingOptions = ({
  url,
  locale = "en",
  device = "desktop",
  timeout = 6e3
}) => {
  const options = {
    url,
    timeout: { request: timeout },
    headerGeneratorOptions: {
      locales: [locale],
      device: [device]
    }
  };
  if (process.env.DEV_PROXYY) {
    options["proxyUrl"] = process.env.DEV_PROXYY;
  }
  if (process.env.HTTP_PROXYY) {
    options["proxyUrl"] = process.env.HTTP_PROXYY;
  }
  return options;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appConfig,
  devices,
  scrapingOptions
});

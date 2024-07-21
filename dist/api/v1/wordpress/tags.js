"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// app/api/v1/wordpress/tags.ts
var tags_exports = {};
__export(tags_exports, {
  wordpressTags: () => wordpressTags
});
module.exports = __toCommonJS(tags_exports);

// app/config.ts
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
  if (process.env.DEV_PROXY) {
    options["proxyUrl"] = process.env.DEV_PROXY;
  }
  if (process.env.HTTP_PROXY) {
    options["proxyUrl"] = process.env.HTTP_PROXY;
  }
  return options;
};

// app/lib/cheerio-tree/wordpressCom-tags.ts
var wordpressComTagsConfig = {
  "tree": {
    "url": {
      "match": "https://wordpress.com/tags"
    },
    "nodes": {
      "trending": {
        "wrapper": {
          "list": true,
          "selector": "div.trending-tags__container .trending-tags__column",
          "normal": {
            "tag": {
              "selector": "a .trending-tags__title"
            },
            "link": {
              "selector": "a",
              "attr": "href",
              "after_regular": [
                {
                  "regex": "^(.*)$",
                  "replace": "https://wordpress.com$1"
                }
              ]
            },
            "count": {
              "to_i": null,
              "selector": ".trending-tags__count",
              "after_regular": [
                {
                  "regex": "K",
                  "replace": "000"
                },
                {
                  "regex": "M",
                  "replace": "000000"
                },
                {
                  "regex": "[^\\d]",
                  "replace": null
                }
              ]
            }
          }
        }
      },
      "tags": {
        "wrapper": {
          "list": true,
          "selector": "div.alphabetic-tags__table",
          "normal": {
            "letter": {
              "selector": "h3"
            },
            "tags": {
              "wrapper": {
                "list": true,
                "selector": "div.alphabetic-tags__col",
                "normal": {
                  "name": {
                    "selector": "a"
                  },
                  "link": {
                    "selector": "a",
                    "attr": "href",
                    "after_regular": [
                      {
                        "regex": "^(.*)$",
                        "replace": "https://wordpress.com$1"
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

// app/api/v1/wordpress/tags.ts
var import_cheerio_tree2 = __toESM(require("cheerio-tree"));
var wordpressTags = async (req, res) => {
  const startTime = Date.now();
  const { url, locale = "en", device = "desktop" } = req.query;
  if (!url) return res.status(500).json({ message: "url is null" });
  const decodedUrl = decodeURIComponent(url);
  const { gotScraping } = await import("got-scraping");
  try {
    if (!new RegExp(wordpressComTagsConfig.tree.url.match).test(decodedUrl)) {
      return res.status(500).json({ message: "url does not match", status: "failed" });
    }
    const options = scrapingOptions({
      locale,
      device,
      url
    });
    const { statusCode, body } = await gotScraping(options);
    const loadtime = ((Date.now() - startTime) / 1e3).toFixed(3);
    res.setHeader("x-page-loadtime", loadtime + "s");
    if (statusCode !== 200) {
      return res.status(statusCode).json({ error: "StatuError", body });
    }
    const tree = new import_cheerio_tree2.default({ body });
    const data = tree.parse({ config: wordpressComTagsConfig });
    return res.status(200).json(data);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  wordpressTags
});

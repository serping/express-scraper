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

// app/lib/cheerio-tree/wordpressCom-tags.ts
var wordpressCom_tags_exports = {};
__export(wordpressCom_tags_exports, {
  wordpressComTagsConfig: () => wordpressComTagsConfig
});
module.exports = __toCommonJS(wordpressCom_tags_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  wordpressComTagsConfig
});

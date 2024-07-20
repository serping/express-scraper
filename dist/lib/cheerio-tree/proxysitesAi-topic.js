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

// app/lib/cheerio-tree/proxysitesAi-topic.ts
var proxysitesAi_topic_exports = {};
__export(proxysitesAi_topic_exports, {
  proxysitesAiTopicConfig: () => proxysitesAiTopicConfig
});
module.exports = __toCommonJS(proxysitesAi_topic_exports);
var proxysitesAiTopicConfig = {
  "tree": {
    "url": {
      "match": "https://www.proxysites.ai/topic/.*"
    },
    "nodes": {
      "title": {
        "selector": "title"
      },
      "sites": {
        "wrapper": {
          "list": true,
          "selector": "div#collection article",
          "normal": {
            "name": {
              "selector": "h3"
            },
            "link": {
              "selector": "h3 a.text-nav",
              "attr": "href"
            },
            "description": {
              "selector": "div.line-clamp-2"
            },
            "tags": {
              "selector": "div.d-flex.flex-wrap.align-items-center > span",
              "is_array": true
            }
          }
        }
      }
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  proxysitesAiTopicConfig
});

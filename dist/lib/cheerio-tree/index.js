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

// app/lib/cheerio-tree/index.ts
var cheerio_tree_exports = {};
__export(cheerio_tree_exports, {
  proxysitesAiCategoryConfig: () => proxysitesAiCategoryConfig,
  proxysitesAiTopicConfig: () => proxysitesAiTopicConfig,
  wordpressComTagsConfig: () => wordpressComTagsConfig,
  wordpressOrgDocumentationConfig: () => wordpressOrgDocumentationConfig,
  wordpressOrgPhotosConfig: () => wordpressOrgPhotosConfig
});
module.exports = __toCommonJS(cheerio_tree_exports);

// app/lib/cheerio-tree/proxysitesAi-category.ts
var proxysitesAiCategoryConfig = {
  "tree": {
    "url": {
      "match": "https://www.proxysites.ai/category/.*"
    },
    "nodes": {
      "title": {
        "selector": "title"
      },
      "topics": {
        "wrapper": {
          "position": true,
          "list": true,
          "selector": 'main > div.row > div[class="col"], div#content > main > div > div.h5',
          "other_types": [
            {
              "name": "with_sites",
              "validate": {
                "selector": '> a:not([role="button"])'
              }
            }
          ],
          "with_sites": {
            "name": {
              "selector": " > a"
            },
            "link": {
              "selector": " > a",
              "attr": "href"
            }
          },
          "normal": {
            "name": {
              "selector": "div.col > a span:nth-child(1)"
            },
            "link": {
              "selector": "div.col > a",
              "attr": "href"
            }
          }
        }
      }
    }
  }
};

// app/lib/cheerio-tree/proxysitesAi-topic.ts
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
                    "attr": "href"
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

// app/lib/cheerio-tree/wordpressOrg-documentation.ts
var wordpressOrgDocumentationConfig = {
  "tree": {
    "url": {
      "match": "https://wordpress.org/documentation/"
    },
    "nodes": {
      "articles": null
    }
  }
};

// app/lib/cheerio-tree/wordpressOrg-photos.ts
var wordpressOrgPhotosConfig = {
  "tree": {
    "url": {
      "match": "https://wordpress.org/photos/"
    },
    "nodes": {
      "articles": null
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  proxysitesAiCategoryConfig,
  proxysitesAiTopicConfig,
  wordpressComTagsConfig,
  wordpressOrgDocumentationConfig,
  wordpressOrgPhotosConfig
});

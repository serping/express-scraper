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

// app/api/v1/google/serp.ts
var serp_exports = {};
__export(serp_exports, {
  googleSerp: () => googleSerp
});
module.exports = __toCommonJS(serp_exports);

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

// app/lib/cheerio-tree/google-desktopSerp.ts
var googleDesktopSerpConfig = {
  "tree": {
    "url": {
      "match": "https://www.google.com/search",
      "params": {
        "q": {
          "name": "query",
          "required": true
        },
        "gl": {
          "name": "Country Code"
        },
        "hl": {
          "name": "lang code"
        },
        "num": {
          "name": "serp results"
        },
        "start": {
          "name": "offset"
        }
      }
    },
    "nodes": {
      "meta": {
        "wrapper": {
          "list": false,
          "selector": "body",
          "normal": {
            "query_displayed": {
              "selector": "#tsf textarea"
            },
            "result_stats": {
              "wrapper": {
                "list": false,
                "selector": "div#result-stats",
                "normal": {
                  "total_results": {
                    "selector": "SELF",
                    "attr": "html",
                    "after_regular": [
                      {
                        "regex": "<nobr>.*</nobr>",
                        "replace": null
                      },
                      {
                        "regex": "[^\\d]",
                        "replace": null
                      }
                    ]
                  },
                  "time_taken_displayed": {
                    "selector": "nobr",
                    "after_regular": [
                      {
                        "regex": "[^\\d\\.]",
                        "replace": null
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      },
      "origin_results": {
        "wrapper": {
          "list": false,
          "selector": 'div[id="rcnt"]',
          "other_types": [
            {
              "name": "tablist",
              "validate": {
                "selector": 'div.XqFnDf [role="tablist"]'
              }
            },
            {
              "name": "store",
              "rename": "normal",
              "validate": {
                "selector": "#rso div.fKw1wf"
              }
            }
          ],
          "tablist": {
            "tabs": {
              "selector": 'span[jsname="AznF2e"]',
              "is_array": true
            },
            "results": {
              "wrapper": {
                "remove_children_node": {
                  "selector": ".LEwnzc.Sqrs4e"
                },
                "position": true,
                "list": true,
                "selector": "#rso > .MjjYud, #Odp5De, #rso > .ULSxyf .TzHB6b",
                "other_types": [
                  {
                    "name": "twitter",
                    "validate": {
                      "selector": "div.g.eejeod"
                    }
                  },
                  {
                    "name": "site_links",
                    "validate": {
                      "selector": ".BYM4Nd"
                    }
                  },
                  {
                    "name": "video",
                    "validate": {
                      "selector": 'div[jscontroller="rTuANe"]',
                      "except": '[jscontroller="UzbKLd"]'
                    }
                  },
                  {
                    "name": "book",
                    "validate": {
                      "selector": 'div.ChPIuf a[href*="tbm=bks"]'
                    }
                  },
                  {
                    "name": "normal",
                    "validate": {
                      "selector": ".g",
                      "except": "product-viewer-group"
                    }
                  }
                ],
                "normal": {
                  "title": {
                    "selector": '.yuRUbf a[jsname="UWckNb"] h3'
                  },
                  "snippet": {
                    "selector": 'div[data-snf="nke7rc"]',
                    "attr": "html",
                    "to_markdown": true
                  },
                  "source": {
                    "wrapper": {
                      "list": false,
                      "selector": 'a[jsname="UWckNb"]',
                      "normal": {
                        "title": {
                          "selector": "h3"
                        },
                        "name": {
                          "selector": 'a[jsname="UWckNb"] span.VuuXrf'
                        },
                        "display_link": {
                          "selector": 'a[jsname="UWckNb"] .byrV5b cite'
                        },
                        "link": {
                          "selector": "SELF",
                          "attr": "href"
                        }
                      }
                    }
                  },
                  "thumbnail": {
                    "selector": 'div[data-snf="Vjbam"] img',
                    "attr": "src"
                  },
                  "snippet_highlighted_words": {
                    "selector": "em",
                    "is_array": true
                  },
                  "rich_snippet": {
                    "wrapper": {
                      "list": false,
                      "selector": "SELF",
                      "normal": {
                        "rated": {
                          "wrapper": {
                            "list": false,
                            "selector": 'div[data-snf="mCCBcf"]',
                            "other_types": [
                              {
                                "name": "store",
                                "validate": {
                                  "selector": "span.z3HNkc.fUNJzc"
                                }
                              },
                              {
                                "name": "normal",
                                "validate": {
                                  "selector": "span.z3HNkc:not(.fUNJzc)"
                                }
                              }
                            ],
                            "store": {
                              "link": {
                                "selector": "a",
                                "attr": "href"
                              },
                              "label": {
                                "selector": "span[aria-label]",
                                "attr": "aria-label"
                              },
                              "rating": {
                                "to_f": null,
                                "selector": "span[aria-hidden]"
                              },
                              "reviews": {
                                "selector": "a",
                                "to_i": null,
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
                                    "regex": "B",
                                    "replace": "000000000"
                                  },
                                  {
                                    "regex": "[^\\d]",
                                    "replace": null
                                  }
                                ]
                              },
                              "reviews_origin": {
                                "selector": "a"
                              }
                            },
                            "normal": {
                              "display_price": {
                                "selector": "span.LI0TWe.wHYlTd"
                              },
                              "rating": {
                                "selector": "div > span:nth-child(2)",
                                "to_f": null,
                                "after_regular": [
                                  {
                                    "regex": "[^\\d\\.]",
                                    "replace": null
                                  }
                                ]
                              },
                              "label": {
                                "selector": "span[aria-label]",
                                "attr": "aria-label"
                              },
                              "reviews": {
                                "selector": "div > span:nth-child(3)",
                                "to_i": null,
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
                                    "regex": "B",
                                    "replace": "000000000"
                                  },
                                  {
                                    "regex": "[^\\d]",
                                    "replace": null
                                  }
                                ]
                              },
                              "reviews_origin": {
                                "selector": "div > span:nth-child(3)"
                              }
                            }
                          }
                        },
                        "extensions": {
                          "selector": 'div[data-snf="mCCBcf"]'
                        }
                      }
                    }
                  },
                  "links": {
                    "wrapper": {
                      "list": true,
                      "selector": 'div[data-snf="gdePb"] a',
                      "normal": {
                        "title": {
                          "selector": "SELF"
                        },
                        "link": {
                          "selector": "SELF",
                          "attr": "href"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "store": {
            "results": {
              "wrapper": {
                "remove_children_node": {
                  "selector": ".LEwnzc.Sqrs4e"
                },
                "position": true,
                "list": true,
                "selector": "#rso > .MjjYud, #Odp5De, #rso > .ULSxyf .TzHB6b",
                "other_types": [
                  {
                    "name": "twitter",
                    "validate": {
                      "selector": "div.g.eejeod"
                    }
                  },
                  {
                    "name": "site_links",
                    "validate": {
                      "selector": ".BYM4Nd"
                    }
                  },
                  {
                    "name": "video",
                    "validate": {
                      "selector": 'div[jscontroller="rTuANe"]',
                      "except": '[jscontroller="UzbKLd"]'
                    }
                  },
                  {
                    "name": "book",
                    "validate": {
                      "selector": 'div.ChPIuf a[href*="tbm=bks"]'
                    }
                  },
                  {
                    "name": "normal",
                    "validate": {
                      "selector": ".g",
                      "except": "product-viewer-group"
                    }
                  }
                ],
                "normal": {
                  "title": {
                    "selector": '.yuRUbf a[jsname="UWckNb"] h3'
                  },
                  "snippet": {
                    "selector": 'div[data-snf="nke7rc"]',
                    "attr": "html",
                    "to_markdown": true
                  },
                  "source": {
                    "wrapper": {
                      "list": false,
                      "selector": 'a[jsname="UWckNb"]',
                      "normal": {
                        "title": {
                          "selector": "h3"
                        },
                        "name": {
                          "selector": 'a[jsname="UWckNb"] span.VuuXrf'
                        },
                        "display_link": {
                          "selector": 'a[jsname="UWckNb"] .byrV5b cite'
                        },
                        "link": {
                          "selector": "SELF",
                          "attr": "href"
                        }
                      }
                    }
                  },
                  "thumbnail": {
                    "selector": 'div[data-snf="Vjbam"] img',
                    "attr": "src"
                  },
                  "snippet_highlighted_words": {
                    "selector": "em",
                    "is_array": true
                  },
                  "rich_snippet": {
                    "wrapper": {
                      "list": false,
                      "selector": "SELF",
                      "normal": {
                        "rated": {
                          "wrapper": {
                            "list": false,
                            "selector": 'div[data-snf="mCCBcf"]',
                            "other_types": [
                              {
                                "name": "store",
                                "validate": {
                                  "selector": "span.z3HNkc.fUNJzc"
                                }
                              },
                              {
                                "name": "normal",
                                "validate": {
                                  "selector": "span.z3HNkc:not(.fUNJzc)"
                                }
                              }
                            ],
                            "store": {
                              "link": {
                                "selector": "a",
                                "attr": "href"
                              },
                              "label": {
                                "selector": "span[aria-label]",
                                "attr": "aria-label"
                              },
                              "rating": {
                                "to_f": null,
                                "selector": "span[aria-hidden]"
                              },
                              "reviews": {
                                "selector": "a",
                                "to_i": null,
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
                                    "regex": "B",
                                    "replace": "000000000"
                                  },
                                  {
                                    "regex": "[^\\d]",
                                    "replace": null
                                  }
                                ]
                              },
                              "reviews_origin": {
                                "selector": "a"
                              }
                            },
                            "normal": {
                              "display_price": {
                                "selector": "span.LI0TWe.wHYlTd"
                              },
                              "rating": {
                                "selector": "div > span:nth-child(2)",
                                "to_f": null,
                                "after_regular": [
                                  {
                                    "regex": "[^\\d\\.]",
                                    "replace": null
                                  }
                                ]
                              },
                              "label": {
                                "selector": "span[aria-label]",
                                "attr": "aria-label"
                              },
                              "reviews": {
                                "selector": "div > span:nth-child(3)",
                                "to_i": null,
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
                                    "regex": "B",
                                    "replace": "000000000"
                                  },
                                  {
                                    "regex": "[^\\d]",
                                    "replace": null
                                  }
                                ]
                              },
                              "reviews_origin": {
                                "selector": "div > span:nth-child(3)"
                              }
                            }
                          }
                        },
                        "extensions": {
                          "selector": 'div[data-snf="mCCBcf"]'
                        }
                      }
                    }
                  },
                  "links": {
                    "wrapper": {
                      "list": true,
                      "selector": 'div[data-snf="gdePb"] a',
                      "normal": {
                        "title": {
                          "selector": "SELF"
                        },
                        "link": {
                          "selector": "SELF",
                          "attr": "href"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "normal": {
            "results": {
              "wrapper": {
                "remove_children_node": {
                  "selector": ".LEwnzc.Sqrs4e"
                },
                "position": true,
                "list": true,
                "selector": "#rso > .MjjYud, #rso div > .MjjYud, #Odp5De",
                "other_types": [
                  {
                    "name": "twitter",
                    "validate": {
                      "selector": "div.g.eejeod"
                    }
                  },
                  {
                    "name": "site_links",
                    "validate": {
                      "selector": ".BYM4Nd"
                    }
                  },
                  {
                    "name": "video",
                    "validate": {
                      "selector": 'div[jscontroller="rTuANe"]',
                      "except": '[jscontroller="UzbKLd"]'
                    }
                  },
                  {
                    "name": "book",
                    "validate": {
                      "selector": 'div.ChPIuf a[href*="tbm=bks"]'
                    }
                  },
                  {
                    "name": "normal",
                    "validate": {
                      "selector": ".g",
                      "except": "product-viewer-group"
                    }
                  }
                ],
                "normal": {
                  "title": {
                    "selector": '.yuRUbf a[jsname="UWckNb"] h3'
                  },
                  "snippet": {
                    "selector": 'div[data-snf="nke7rc"]',
                    "attr": "html",
                    "to_markdown": true
                  },
                  "source": {
                    "wrapper": {
                      "list": false,
                      "selector": 'a[jsname="UWckNb"]',
                      "normal": {
                        "title": {
                          "selector": "h3"
                        },
                        "name": {
                          "selector": 'a[jsname="UWckNb"] span.VuuXrf'
                        },
                        "display_link": {
                          "selector": 'a[jsname="UWckNb"] .byrV5b cite'
                        },
                        "link": {
                          "selector": "SELF",
                          "attr": "href"
                        }
                      }
                    }
                  },
                  "thumbnail": {
                    "selector": 'div[data-snf="Vjbam"] img',
                    "attr": "src"
                  },
                  "snippet_highlighted_words": {
                    "selector": "em",
                    "is_array": true
                  },
                  "rich_snippet": {
                    "wrapper": {
                      "list": false,
                      "selector": "SELF",
                      "normal": {
                        "rated": {
                          "wrapper": {
                            "list": false,
                            "selector": 'div[data-snf="mCCBcf"]',
                            "other_types": [
                              {
                                "name": "store",
                                "validate": {
                                  "selector": "span.z3HNkc.fUNJzc"
                                }
                              },
                              {
                                "name": "normal",
                                "validate": {
                                  "selector": "span.z3HNkc:not(.fUNJzc)"
                                }
                              }
                            ],
                            "store": {
                              "link": {
                                "selector": "a",
                                "attr": "href"
                              },
                              "label": {
                                "selector": "span[aria-label]",
                                "attr": "aria-label"
                              },
                              "rating": {
                                "to_f": null,
                                "selector": "span[aria-hidden]"
                              },
                              "reviews": {
                                "selector": "a",
                                "to_i": null,
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
                                    "regex": "B",
                                    "replace": "000000000"
                                  },
                                  {
                                    "regex": "[^\\d]",
                                    "replace": null
                                  }
                                ]
                              },
                              "reviews_origin": {
                                "selector": "a"
                              }
                            },
                            "normal": {
                              "display_price": {
                                "selector": "span.LI0TWe.wHYlTd"
                              },
                              "rating": {
                                "selector": "div > span:nth-child(2)",
                                "to_f": null,
                                "after_regular": [
                                  {
                                    "regex": "[^\\d\\.]",
                                    "replace": null
                                  }
                                ]
                              },
                              "label": {
                                "selector": "span[aria-label]",
                                "attr": "aria-label"
                              },
                              "reviews": {
                                "selector": "div > span:nth-child(3)",
                                "to_i": null,
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
                                    "regex": "B",
                                    "replace": "000000000"
                                  },
                                  {
                                    "regex": "[^\\d]",
                                    "replace": null
                                  }
                                ]
                              },
                              "reviews_origin": {
                                "selector": "div > span:nth-child(3)"
                              }
                            }
                          }
                        },
                        "extensions": {
                          "selector": 'div[data-snf="mCCBcf"]'
                        }
                      }
                    }
                  },
                  "links": {
                    "wrapper": {
                      "list": true,
                      "selector": 'div[data-snf="gdePb"] a',
                      "normal": {
                        "title": {
                          "selector": "SELF"
                        },
                        "link": {
                          "selector": "SELF",
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
      }
    }
  }
};

// app/api/v1/google/serp.ts
var import_cheerio_tree2 = __toESM(require("cheerio-tree"));
var googleSerp = async (req, res) => {
  const startTime = Date.now();
  const { q, locale = "en", device = "desktop" } = req.query;
  const { gotScraping } = await import("got-scraping");
  try {
    if (!q) {
      return res.status(500).json({ message: "q is null", status: "failed" });
    }
    delete req.query.locale;
    delete req.query.device;
    let serpUrl = "https://www.google.com/search?";
    for (const [key, value] of Object.entries(req.query)) {
      serpUrl += `${key}=${value}&`;
    }
    serpUrl += "ie=UTF-8";
    const options = scrapingOptions({
      locale,
      device,
      url: serpUrl
    });
    const { statusCode, body } = await gotScraping(options);
    const loadtime = ((Date.now() - startTime) / 1e3).toFixed(3);
    res.setHeader("x-page-loadtime", loadtime + "s");
    if (statusCode !== 200) {
      return res.status(statusCode).json({ error: "StatuError", statusCode, body });
    }
    const tree = new import_cheerio_tree2.default({ body, duration: true });
    const data = tree.parse({ config: googleDesktopSerpConfig });
    return res.status(200).json(data);
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  googleSerp
});

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

// app/lib/cheerio-tree/google-desktopSerp.ts
var google_desktopSerp_exports = {};
__export(google_desktopSerp_exports, {
  googleDesktopSerpConfig: () => googleDesktopSerpConfig
});
module.exports = __toCommonJS(google_desktopSerp_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  googleDesktopSerpConfig
});

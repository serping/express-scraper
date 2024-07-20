export const wordpressComTagsConfig = {
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
}
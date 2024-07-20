export const proxysitesAiCategoryConfig = {
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
          "selector": "main > div.row > div[class=\"col\"], div#content > main > div > div.h5",
          "other_types": [
            {
              "name": "with_sites",
              "validate": {
                "selector": "> a:not([role=\"button\"])"
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
}
export const proxysitesAiTopicConfig = {
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
}
# Express Scraper API Build With Cheerio Tree

[Cheerio Tree](https://github.com/serping/cheerio-tree) is a powerful utility built on [Cheerio](https://github.com/cheeriojs/cheerio), designed for efficient DOM parsing. It enables rapid conversion of HTML data into JSON format. When paired with YAML, it provides an intuitive and streamlined approach to data handling and transformation.

## Start

```bash
npm run dev

# or
yarn dev

# or
pnpm dev

```

Now, Try Your Fist Api Scraper:

Localhost:

[https://www.proxysites.ai/category](http://localhost:3000/api/v1/proxysites.ai/category?url=https://www.proxysites.ai/category/proxy-type)

[https://wordpress.com/tags](http://localhost:3000/api/v1/wordpress.com/tags?url=https://wordpress.com/tags)

Online:

[https://www.proxysites.ai/category](https://express-scraper-api.vercel.app/api/v1/proxysites.ai/category?url=https://www.proxysites.ai/category/proxy-type&token=expressapikey)

[https://wordpress.com/tags](https://express-scraper-api.vercel.app/api/v1/wordpress.com/tags?url=https://wordpress.com/tags&token=expressapikey)

## Create Your YAML

For example: [data/wordpressCom/tags.yml](data/wordpressCom/tags.yml)

Please use camelCase for folder and file naming.

After saving the YAML file, it will be automatically converted to JSON in the development environment

and saved as **app/lib/cheerio-tree/wordpressCom-tags.ts.**

Make sure to configure the parsing settings in the predetermined format to avoid issues with file generation.

```yaml
# data/wordpressCom/tags.yml
regexToI: &regexToI
  regex: '[^\d]'
  replace:
regexToF: &regexToF
  regex: '[^\d\.]'
  replace:

regexToK: &regexToK
  regex: 'K'
  replace: "000"

regexToM: &regexToM
  regex: 'M'
  replace: "000000"

# string to int
# eg. 1.1K will be 1100
toI: &toI
  - <<: *regexToK
  - <<: *regexToM
  - <<: *regexToI

addHost: &addHost
  regex: '^(.*)$'
  replace: https://wordpress.com$1

# Main
# ==================================================
# ==================================================
tree:
  # URL to match
  url:
    match: https://wordpress.com/tags
  nodes:
    trending:
      wrapper:
        list: true
        selector: div.trending-tags__container .trending-tags__column
        normal:
          tag:
            selector: a .trending-tags__title
          link:
            selector: a
            attr: href
            after_regular:
              - <<: *addHost
          count:
            to_i:
            selector: .trending-tags__count
            after_regular: *toI
```

## Build

```bash
npm run build

# or 
# pnpm build

git add dist && git commit -m  "build"

```

## Test

Create your test at [**tests**](__tests__/)

```bash
pnpm test

or npm run test
```

## Deploy on Vercel

You can deploy this project to Vercel with the following button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/serping/express-scraper)

### Config ENV

```bash
# Config Your Api Key
SECRET_API_KEY=your_api_key

# You can find at https://www.proxysites.ai/
HTTP_PROXYY=
```

### How use to my api?

You can use your API with two authentication methods: URL parameter and Header parameter. Here is how to use these two methods for authentication in detail.

#### URL Param Authentication

Add the token parameter to the request URL and set your API key as the parameter value. For example, if your API endpoint is <http://localhost:3000/api/v1/resource> and your API key is your_api_key, you can call the API like this:

```bash
curl "http://localhost:3000/api/v1/resource?token=your_api_key"
```

#### Header Authentication

Add X-Api-Key to the request header and set your API key as the value. You can use the curl command to send a request with a custom header:

```bash
curl -H "X-Api-Key: your_api_key" "http://localhost:3000/api/v1/resource"
```

#### Examples

Suppose you have an API endpoint <https://express-scraper-api.vercel.app/api/v1/proxysites.ai/category?url=https://www.proxysites.ai/category/proxy-type>. You can authenticate using the following two methods:

API Key: **expressapikey**

##### 1. Using URL Param

```sh
curl "https://express-scraper-api.vercel.app/api/v1/proxysites.ai/category?url=https://www.proxysites.ai/category/proxy-type&token=expressapikey"
```

##### 2. Using Header

```sh
curl  -H "X-Api-Key: expressapikey" "https://express-scraper-api.vercel.app/api/v1/proxysites.ai/category?url=https://www.proxysites.ai/category/proxy-type"
```

#### Summary

**URL Param Authentication**: Add the `token` parameter to the request URL.

**Header Authentication**: Add `X-Api-Key` to the request header.

Choose the appropriate authentication method based on your needs and use case. Generally, using header authentication is more secure as it does not expose the key in the URL.

#### Using in Code

You can call the API in your code as follows:

##### Using JavaScript (Fetch API)

```javascript
function urlEncode(url) {
  return encodeURIComponent(url);
}

const encodedUrl = urlEncode('https://www.proxysites.ai/category/proxy-type');
const apiKey = 'expressapikey';
// Using URL Param
fetch(`https://express-scraper-api.vercel.app/api/v1/proxysites.ai/category?url=${urlEncode}&token=${apiKey}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Using Header
fetch(`https://express-scraper-api.vercel.app/api/v1/proxysites.ai/category?url=${urlEncode}`, {
  headers: {
    'X-Api-Key': apiKey
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

##### Python (requests)

```python

import requests
import urllib.parse

def url_encode(url):
    return urllib.parse.quote(url, safe='')

encoded_url = url_encode('https://www.proxysites.ai/category/proxy-type')
api_key = 'expressapikey'

# Using URL Param
url_param_response = requests.get(
    'https://express-scraper-api.vercel.app/api/v1/proxysites.ai/category',
    params={'url': encoded_url, 'token': api_key}
)

print("URL Param Response:")
print(url_param_response.json())

# Using Header
headers = {
    'X-Api-Key': api_key
}
header_response = requests.get(
    'https://express-scraper-api.vercel.app/api/v1/proxysites.ai/category',
    headers=headers,
    params={'url': encoded_url}
)

print("Header Response:")
print(header_response.json())

```

## Dependencies

- [cheerio-tree](https://github.com/serping/cheerio-tree)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [debug](https://www.npmjs.com/package/debug)
- [express](https://github.com/expressjs/express)
- [got-scraping](https://www.npmjs.com/package/got-scraping)
- [morgan](https://www.npmjs.com/package/morgan)
- [turndown](https://www.npmjs.com/package/turndown)

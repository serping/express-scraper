# express scraper

## Start

```bash
npm run dev

# or
yarn dev

# or
pnpm dev

```

Now, Try Your Fist Api Scraper:

<http://localhost:3000/api/v1/proxysites.ai/category?url=https://www.proxysites.ai/category/proxy-type>

## Create Your YAML

For example: data/wordpressCom/tags.yml

Please use camelCase for folder and file naming.

After saving the YAML file, it will be automatically converted to JSON in the development environment and saved as app/lib/cheerio-tree/wordpressCom-tags.ts.

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

## Test

Create your test in [__tests__](__tests__/CheerioTree.ts)

```bash
pnpm test

or npm run test
```

## Dependencies

- [cheerio-tree](https://github.com/serping/cheerio-tree)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [debug](https://www.npmjs.com/package/debug)
- [express](https://github.com/expressjs/express)
- [got-scraping](https://www.npmjs.com/package/got-scraping)
- [morgan](https://www.npmjs.com/package/morgan)
- [turndown](https://www.npmjs.com/package/turndown)

import type { CheerioTreeOptions } from "cheerio-tree";
import CheerioTree from "cheerio-tree";
import fs from 'fs';
import { proxysitesAiCategoryConfig, proxysitesAiTopicConfig, wordpressComTagsConfig } from '../app/lib/cheerio-tree';
const cwd = process.cwd();

describe('CheerioTree', () => {
  let cheerioTree: CheerioTree;


  it('wordpress.com tags test', async () => {
    const body = fs.readFileSync(cwd + '/__tests__/data/wordpressCom/tags.html', 'utf-8');
    const defaultConfig: CheerioTreeOptions = { body: body };
    cheerioTree = new CheerioTree(defaultConfig);

    const data = cheerioTree.parse({ config: wordpressComTagsConfig });

    // console.log('data', JSON.stringify(data, null, 2));
    expect(data.trending[0].tag).toEqual('Dailyprompt');
    expect(typeof data.trending[0].count).toEqual('number');
  });

  it('proxysites.ai topic test', async () => {
    const body = fs.readFileSync(cwd + '/__tests__/data/proxysitesAi/topic.html', 'utf-8');
    const defaultConfig: CheerioTreeOptions = { body: body };
    cheerioTree = new CheerioTree(defaultConfig);

    const data = cheerioTree.parse({ config: proxysitesAiTopicConfig });

    // console.log('data', JSON.stringify(data, null, 2));
    expect(data.sites[0].tags.length).toBeGreaterThan(0);
  });

  it('proxysites.ai category test', async () => {
    const normal = fs.readFileSync(cwd + '/__tests__/data/proxysitesAi/category-normal.html', 'utf-8');
    const with_sites = fs.readFileSync(cwd + '/__tests__/data/proxysitesAi/category-with_sites.html', 'utf-8');
    const defaultConfig: CheerioTreeOptions = { body: normal };
    cheerioTree = new CheerioTree(defaultConfig);

    const data = cheerioTree.parse({ config: proxysitesAiCategoryConfig });

    cheerioTree.load(with_sites);
    const withSitesData = cheerioTree.parse({ config: proxysitesAiCategoryConfig });

    // console.log('data', JSON.stringify(data, null, 2));
    // console.log('withSitesData', JSON.stringify(withSitesData, null, 2));
    expect(data.topics[0].position).toEqual(1);
    expect(withSitesData.topics[0].position).toEqual(1);
  });

});

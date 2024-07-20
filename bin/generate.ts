#!/usr/bin/env tsx

import type { CheerioTreeConfig } from "cheerio-tree";
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const cwd = process.cwd();
const cheerioTreePath = `${cwd}/app/lib/cheerio-tree`;

function capitalizeFirstLetter(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const dataDir = path.join(cwd, 'data');
let cheerioTreeIndexContent = `
/**
 * Do not modify this file. It is auto-generated.
 *
*/
`;
const sites: string[] = [];
const sitesMap: {
  [key: string]: string[]
} = {}

const generateData = ({
  dir,
  parentPath,
  depth = 0
}: {
  dir: string;
  parentPath?: string;
  depth?: number;
}) => {
  if (depth > 1) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(entry => {
    if (entry.isDirectory()) {
      if (/^\w[\d\w]*$/.test(entry.name)) {
        sites.push(entry.name);
        generateData({ dir: path.join(dir, entry.name), parentPath: entry.name, depth: depth + 1 });
      } else {
        console.error("Directory Name Error:", entry)
      }
    } else if (entry.isFile() && entry.name.endsWith('.yml')) {
      if (!parentPath) return;
      const name = entry.name.replace('.yml', '');

      if (!sitesMap[parentPath]) sitesMap[parentPath] = [];
      sitesMap[parentPath].push(name);

      const config = fs.readFileSync(path.join(dir, entry.name), 'utf-8');
      const data = yaml.load(config) as CheerioTreeConfig;
      if (!data.tree || !data.tree.nodes) console.error("YAML tree.nodes is not found:", dir);
      const fileName = `${parentPath}-${name}`;
      const filePath = `${cheerioTreePath}/${fileName}.ts`;
      fs.writeFileSync(filePath, `export const ${parentPath}${capitalizeFirstLetter(name)}Config = ${JSON.stringify({ tree: data.tree }, null, 2)}`, 'utf-8');
      cheerioTreeIndexContent += `export * from "./${fileName}";\n`
      console.info(`${filePath} Saved!`)
    }
  });
}
generateData({ dir: dataDir });


const siteFilePath = path.join(process.cwd(), 'app/site.ts');

let siteContent = `
/**
 * Do not modify this file. It is auto-generated.
 *
*/
export const scrapingSites = ["${sites.join('","')}"] as const;
`
for (const [site, pages] of Object.entries(sitesMap)) {
  const siteName = capitalizeFirstLetter(site);
  const code = `
// ${site}
export const scraping${siteName}Pages = ["${pages.join('", "')}"] as const;
export type Scraping${siteName}Page = typeof scraping${siteName}Pages[number];
`;
  siteContent += code;
}

siteContent += `
// types
export type ScrapingSite = typeof scrapingSites[number];
export type ScrapingPage = ${sites.map(item => `Scraping${capitalizeFirstLetter(item)}Page`).join(" | ")};

export const sites: Record<ScrapingSite, readonly any[]> = {
  ${sites.map(item => `${item}: scraping${capitalizeFirstLetter(item)}Pages`).join(", \n  ")}
} as const;
`

fs.writeFileSync(siteFilePath, siteContent, 'utf-8');

fs.writeFileSync(`${cheerioTreePath}/index.ts`, cheerioTreeIndexContent, 'utf-8');


console.log("Sites:", sites);
console.info(`${siteFilePath} Saved!\n`);

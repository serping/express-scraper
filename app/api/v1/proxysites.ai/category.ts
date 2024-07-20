import { type Device } from '@/app/config';
import { proxysitesAiCategoryConfig } from '@/app/lib/cheerio-tree';
import CheerioTree from 'cheerio-tree';
import { Request, Response } from 'express';

/**
 * 
 * Test Your Scraping Now!
 * http://localhost:3000/api/v1/proxysites.ai/category?url=https://www.proxysites.ai/category/proxy-type
 * 
 * @returns 
 */
export const proxysiteAiCategory = async (req: Request, res: Response) => {
  const startTime = Date.now();
  const { url, locale = "en", device = "desktop" } = req.query as {
    url: string;
    locale?: string;
    device?: Device
  };

  const { gotScraping } = await import('got-scraping');

  try {

    if (!url) return res.status(500).json({ message: "url is null" });
    if (!new RegExp(proxysitesAiCategoryConfig.tree.url.match).test(url)) {
      return res.status(500).json({ message: "url does not match", status: "failed" });
    }

    const scrapingOptions: any = {
      url,
      timeout: { request: 6_000 },
      headerGeneratorOptions: {
        locales: [locale],
        device: [device]
      }
    }

    // local dev proxy
    if (process.env.DEV_PROXYY) {
      scrapingOptions["proxyUrl"] = process.env.DEV_PROXYY;
    }

    // Production proxy
    if (process.env.PROXYY) {
      scrapingOptions["proxyUrl"] = process.env.PROXYY;
    }

    const { statusCode, body } = await gotScraping(scrapingOptions);

    if (statusCode !== 200) {
      return res.status(statusCode).json({ error: "StatuError", body });
    }
    const tree = new CheerioTree({ body });

    // parseing
    const data = tree.parse({ config: proxysitesAiCategoryConfig });

    // runtime
    const endTime = Date.now();
    const executionTime = ((endTime - startTime) / 1000).toFixed(6);
    res.setHeader('x-express-runtime', executionTime);

    // render
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: error });
  }
}
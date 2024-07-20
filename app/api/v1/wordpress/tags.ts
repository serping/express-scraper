import { type Device, scrapingOptions } from '@/app/config';
import { wordpressComTagsConfig } from '@/app/lib/cheerio-tree';
import CheerioTree from 'cheerio-tree';
import { Request, Response } from 'express';

/**
 * 
 * Test Your Scraping Now!
 * http://localhost:3000/api/v1/wordpress.com/tags?url=https://wordpress.com/tags
 * 
 * @returns 
 */
export const wordpressTags = async (req: Request, res: Response) => {
  const startTime = Date.now();
  const { url, locale = "en", device = "desktop" } = req.query as {
    url: string;
    locale?: string;
    device?: Device
  };
  if (!url) return res.status(500).json({ message: "url is null" });
  const decodedUrl = decodeURIComponent(url);
  const { gotScraping } = await import('got-scraping');

  try {

    if (!new RegExp(wordpressComTagsConfig.tree.url.match).test(decodedUrl)) {
      return res.status(500).json({ message: "url does not match", status: "failed" });
    }

    const options = scrapingOptions({
      locale,
      device,
      url
    })

    const { statusCode, body } = await gotScraping(options);

    if (statusCode !== 200) {
      return res.status(statusCode).json({ error: "StatuError", body });
    }
    const tree = new CheerioTree({ body });

    // parseing
    const data = tree.parse({ config: wordpressComTagsConfig });

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
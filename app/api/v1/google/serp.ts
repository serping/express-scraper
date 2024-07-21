import { type Device, scrapingOptions } from '@/app/config';
import { googleDesktopSerpConfig } from '@/app/lib/cheerio-tree';
import CheerioTree from 'cheerio-tree';
import { Request, Response } from 'express';

/**
 * 
 * Test Your Scraping Now!
 * http://localhost:3000/api/v1/google/serp?q=serping
 * 
 * Just like google's search url: https://www.google.com/search?q=serping
 * 
 * @returns 
 */
export const googleSerp = async (req: Request, res: Response) => {
  const startTime = Date.now();

  // locale, device is for headers auto-generated
  const { q, locale = "en", device = "desktop" } = req.query as {
    q: string;
    locale?: string;
    device?: Device
  };

  const { gotScraping } = await import('got-scraping');

  try {

    if (!q) {
      return res.status(500).json({ message: "q is null", status: "failed" });
    }

    delete req.query.locale
    delete req.query.device

    // build serp url
    let serpUrl = 'https://www.google.com/search?';
    for (const [key, value] of Object.entries(req.query)) {
      serpUrl += `${key}=${value}&`
    }
    serpUrl += "ie=UTF-8";

    const options = scrapingOptions({
      locale,
      device,
      url: serpUrl
    })

    const { statusCode, body } = await gotScraping(options);

    // Load Time 
    const loadtime = ((Date.now() - startTime) / 1000).toFixed(3);
    res.setHeader('x-page-loadtime', loadtime + "s");

    if (statusCode !== 200) {
      return res.status(statusCode).json({ error: "StatuError", statusCode, body });
    }
    const tree = new CheerioTree({ body, duration: true });

    // parsing
    const data = tree.parse({ config: googleDesktopSerpConfig });

    // render
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: error });
  }
}
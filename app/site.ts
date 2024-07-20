
/**
 * Do not modify this file. It is auto-generated.
 *
*/
export const scrapingSites = ["proxysitesAi","wordpressCom","wordpressOrg"] as const;

// proxysitesAi
export const scrapingProxysitesAiPages = ["category", "topic"] as const;
export type ScrapingProxysitesAiPage = typeof scrapingProxysitesAiPages[number];

// wordpressCom
export const scrapingWordpressComPages = ["tags"] as const;
export type ScrapingWordpressComPage = typeof scrapingWordpressComPages[number];

// wordpressOrg
export const scrapingWordpressOrgPages = ["documentation", "photos"] as const;
export type ScrapingWordpressOrgPage = typeof scrapingWordpressOrgPages[number];

// types
export type ScrapingSite = typeof scrapingSites[number];
export type ScrapingPage = ScrapingProxysitesAiPage | ScrapingWordpressComPage | ScrapingWordpressOrgPage;

export const sites: Record<ScrapingSite, readonly any[]> = {
  proxysitesAi: scrapingProxysitesAiPages, 
  wordpressCom: scrapingWordpressComPages, 
  wordpressOrg: scrapingWordpressOrgPages
} as const;

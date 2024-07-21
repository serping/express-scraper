
/**
 * Do not modify this file. It is auto-generated.
 *
*/
export const scrapingSites = ["google","proxysitesAi","wordpressCom","wordpressOrg"] as const;

// google
export const scrapingGooglePages = ["desktopSerp"] as const;
export type ScrapingGooglePage = typeof scrapingGooglePages[number];

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
export type ScrapingPage = ScrapingGooglePage | ScrapingProxysitesAiPage | ScrapingWordpressComPage | ScrapingWordpressOrgPage;

export const sites: Record<ScrapingSite, readonly any[]> = {
  google: scrapingGooglePages, 
  proxysitesAi: scrapingProxysitesAiPages, 
  wordpressCom: scrapingWordpressComPages, 
  wordpressOrg: scrapingWordpressOrgPages
} as const;

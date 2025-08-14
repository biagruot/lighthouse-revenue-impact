export interface LighthouseMetrics {
  perfScore?: number;
  accessibility?: number;
  seo?: number;
  best?: number;
  lcp?: number; // Largest Contentful Paint in seconds
  cls?: number; // Cumulative Layout Shift (unitless)
  inp?: number; // Interaction to Next Paint in seconds
  tbt?: number; // Total Blocking Time in milliseconds
}

/**
 * Parses Lighthouse JSON output and extracts key performance metrics
 * 
 * Converts Lighthouse scores (0-1) to percentages (0-100) and 
 * converts timing metrics to consistent units (seconds for LCP/INP, ms for TBT)
 * 
 * @param jsonText - Raw JSON string from Lighthouse report
 * @returns Parsed metrics object, empty object if parsing fails
 */
export function parseLighthouse(jsonText: string): LighthouseMetrics {
  try {
    const data = JSON.parse(jsonText);
    const categories = data?.categories || {};
    const audits = data?.audits || {};

    return {
      // Convert category scores from 0-1 to 0-100 scale
      perfScore: parseScore(categories.performance?.score),
      accessibility: parseScore(categories.accessibility?.score),
      seo: parseScore(categories.seo?.score),
      best: parseScore(categories["best-practices"]?.score),
      
      // Convert Core Web Vitals to consistent units
      lcp: convertToSeconds(audits["largest-contentful-paint"]?.numericValue),
      cls: audits["cumulative-layout-shift"]?.numericValue,
      inp: convertToSeconds(audits["interaction-to-next-paint"]?.numericValue),
      tbt: audits["total-blocking-time"]?.numericValue, // Keep TBT in milliseconds
    };
  } catch {
    return {};
  }
}

/**
 * Converts Lighthouse score (0-1) to percentage (0-100), rounded
 */
function parseScore(score: number | null | undefined): number | undefined {
  return score != null ? Math.round(score * 100) : undefined;
}

/**
 * Converts milliseconds to seconds for timing metrics
 */
function convertToSeconds(milliseconds: number | null | undefined): number | undefined {
  return milliseconds != null ? Number(milliseconds) / 1000 : undefined;
}


import type { LighthouseMetrics } from "./lighthouse";

export interface CalculationInput {
  metrics: LighthouseMetrics;
  monthlySessions: string;
  avgOrderValue: string;
  conversionRate: string;
}

export interface CalculationResult {
  headline: string;
  baselineRevenue: number;
  speedLoss: number;
  speedSecLoss: number;
  a11yLoss: number;
}

// Industry benchmarks from Deloitte "Milliseconds Make Millions" (2020)
// Based on 37 brands, 30M sessions over 4 weeks
const PERFORMANCE_BENCHMARKS = {
  // Core Web Vitals targets
  TARGET_LCP_SECONDS: 2.5,
  TARGET_CLS: 0.1,
  TARGET_INP_SECONDS: 0.2,
  TARGET_TBT_MS: 200,
  
  // Deloitte found 8.4% conversion lift per 0.1s improvement across 4 metrics
  DELOITTE_BASE_IMPACT: 0.084, // 8.4% impact per 0.1s (original finding)
  MAX_REALISTIC_IMPACT: 0.5, // Cap at 50% to avoid unrealistic projections
  SIMPLE_SPEED_IMPACT: 0.02, // 2% revenue loss per second slower (fallback)
} as const;

// Vertical-specific impacts from Deloitte study (per 0.1s improvement)
const VERTICAL_BENCHMARKS = {
  retail: { conversionLift: 0.084, aovLift: 0.092 },
  travel: { conversionLift: 0.101, aovLift: 0.019 }, 
  luxury: { conversionLift: 0.036, aovLift: 0.08 },
  default: { conversionLift: 0.084, aovLift: 0.05 } // Conservative average
} as const;

const ACCESSIBILITY_BENCHMARKS = {
  TARGET_SCORE: 90,
  MAX_GAP_RANGE: 30,
  REVENUE_IMPACT_RATE: 0.02, // 2% revenue impact at worst case
} as const;

/**
 * Safely converts string input to number, removing common formatting
 */
function parseNumericInput(input: string): number {
  return Number(input.replace(/,/g, ""));
}

/**
 * Validates that all required business metrics are present and valid
 */
function validateInputs(
  sessions: number,
  avgOrder: number,
  conversion: number
): { isValid: boolean; error?: string } {
  if (isNaN(sessions) || isNaN(avgOrder) || isNaN(conversion)) {
    return { isValid: false, error: "Please enter valid numbers for all fields." };
  }
  
  if (sessions <= 0 || avgOrder <= 0 || conversion <= 0) {
    return { isValid: false, error: "All values must be greater than zero." };
  }

  return { isValid: true };
}

/**
 * Calculates individual metric performance compared to target
 * Returns a normalized score where 0 = at target, positive = worse than target
 */
function calculateMetricImpact(metric: string, value: number | undefined): number {
  if (value === undefined) return 0;
  
  switch (metric) {
    case 'lcp':
      return Math.max(0, value - PERFORMANCE_BENCHMARKS.TARGET_LCP_SECONDS);
    case 'cls':
      return Math.max(0, value - PERFORMANCE_BENCHMARKS.TARGET_CLS);
    case 'inp':
      return Math.max(0, value - PERFORMANCE_BENCHMARKS.TARGET_INP_SECONDS);
    case 'tbt':
      // Convert TBT milliseconds to seconds for consistent units
      return Math.max(0, (value - PERFORMANCE_BENCHMARKS.TARGET_TBT_MS) / 1000);
    default:
      return 0;
  }
}

/**
 * Calculates potential revenue loss from multiple Core Web Vitals metrics
 * 
 * Uses full Deloitte 2020 research methodology:
 * - Original study: 8.4% impact per 0.1s across 4 metrics (LCP, CLS, INP, TBT)
 * - Our approach: Use all available metrics, same as original study
 * - Cap results to prevent unrealistic projections
 */
function calculateSpeedImpact(metrics: LighthouseMetrics, baselineRevenue: number) {
  const { lcp, cls, inp, tbt } = metrics;
  
  // Calculate impact from each available metric
  const lcpImpact = calculateMetricImpact('lcp', lcp);
  const clsImpact = calculateMetricImpact('cls', cls);
  const inpImpact = calculateMetricImpact('inp', inp);
  const tbtImpact = calculateMetricImpact('tbt', tbt);
  
  // Sum total performance gap across all metrics (in seconds)
  const totalSecondsOverTarget = lcpImpact + clsImpact + inpImpact + tbtImpact;
  
  if (totalSecondsOverTarget <= 0) {
    return { speedLoss: 0, speedSecLoss: 0 };
  }
  
  const { DELOITTE_BASE_IMPACT, MAX_REALISTIC_IMPACT, SIMPLE_SPEED_IMPACT } = PERFORMANCE_BENCHMARKS;
  
  // Deloitte-based method: 8.4% per 0.1s improvement across 4 metrics
  const hundredMsSteps = totalSecondsOverTarget * 10; // Convert to 100ms steps
  const rawImpact = Math.pow(1 + DELOITTE_BASE_IMPACT, hundredMsSteps) - 1;
  const cappedImpact = Math.min(rawImpact, MAX_REALISTIC_IMPACT);
  const speedLoss = baselineRevenue * cappedImpact;
  
  // Simplified linear method: 2% per second slower
  const speedSecLoss = baselineRevenue * SIMPLE_SPEED_IMPACT * totalSecondsOverTarget;

  return { speedLoss, speedSecLoss };
}

/**
 * Calculates potential revenue loss from poor accessibility
 * Conservative estimate based on accessibility score gap from target
 */
function calculateAccessibilityImpact(accessibility: number | undefined, baselineRevenue: number): number {
  if (typeof accessibility !== "number") return 0;

  const { TARGET_SCORE, MAX_GAP_RANGE, REVENUE_IMPACT_RATE } = ACCESSIBILITY_BENCHMARKS;
  
  // Gap from target score (90)
  const scoreGap = Math.max(0, TARGET_SCORE - accessibility);
  
  // Scale the impact: full impact at 30+ point gap, linear scaling below
  const impactRatio = Math.min(1, scoreGap / MAX_GAP_RANGE);
  
  return baselineRevenue * REVENUE_IMPACT_RATE * impactRatio;
}

/**
 * Generates a human-readable headline summarizing current performance state
 */
function generateHeadline(metrics: LighthouseMetrics): string {
  const { perfScore, accessibility, lcp, cls, inp, tbt } = metrics;
  const parts = [];

  // Show Core Web Vitals details
  const vitals = [];
  if (typeof lcp === "number") {
    vitals.push(`LCP ${lcp.toFixed(1)}s`);
  }
  if (typeof cls === "number") {
    vitals.push(`CLS ${cls.toFixed(3)}`);
  }
  if (typeof inp === "number") {
    vitals.push(`INP ${(inp * 1000).toFixed(0)}ms`);
  }
  if (typeof tbt === "number") {
    vitals.push(`TBT ${tbt.toFixed(0)}ms`);
  }
  
  if (vitals.length > 0) {
    parts.push(vitals.join(" · "));
  }
  
  // Show overall scores
  const scores = [];
  if (typeof perfScore === "number") {
    scores.push(`Performance ${perfScore}/100`);
  }
  if (typeof accessibility === "number") {
    scores.push(`Accessibility ${accessibility}/100`);
  }
  
  if (scores.length > 0) {
    parts.push(scores.join(" · "));
  }

  return parts.join(" | ");
}

/**
 * Calculates the business impact of performance and accessibility metrics.
 * 
 * Based on Deloitte "Milliseconds Make Millions" study (2020):
 * - 37 brands analyzed over 4 weeks (30M sessions)
 * - Found 8.4% conversion lift per 0.1s improvement across 4 metrics
 * - Our implementation uses all available metrics (LCP, CLS, INP, TBT) like original study
 * 
 * This function:
 * 1. Validates inputs and converts strings to numbers
 * 2. Calculates baseline monthly revenue 
 * 3. Estimates revenue loss using full Deloitte methodology + simple linear model
 * 4. Estimates revenue loss from accessibility issues
 * 5. Returns structured results with headline summary
 * 
 * Methodology:
 * - Deloitte method: Full 8.4% impact per 0.1s across available Core Web Vitals
 * - Capped at 50% max impact to prevent unrealistic projections
 * - Linear fallback: 2% revenue impact per second of combined delay
 * - Accessibility: Conservative 2% impact based on score gap
 */
export function calculateBusinessImpact({
  metrics,
  monthlySessions,
  avgOrderValue,
  conversionRate,
}: CalculationInput): CalculationResult | { error: string } {
  const { perfScore, accessibility, lcp } = metrics;

  // Validate we have at least one metric to work with
  if (perfScore == null && accessibility == null && lcp == null) {
    return { error: "Could not read Lighthouse JSON" };
  }

  // Parse and validate business inputs
  const sessions = parseNumericInput(monthlySessions);
  const avgOrder = parseNumericInput(avgOrderValue);
  const conversion = parseNumericInput(conversionRate);

  const validation = validateInputs(sessions, avgOrder, conversion);
  if (!validation.isValid) {
    return { error: validation.error! };
  }

  // Calculate baseline monthly revenue: Sessions × Conversion Rate × Average Order Value
  const baselineRevenue = sessions * (conversion / 100) * avgOrder;

  // Calculate performance-related revenue impact
  const { speedLoss, speedSecLoss } = calculateSpeedImpact(metrics, baselineRevenue);

  // Calculate accessibility-related revenue impact
  const a11yLoss = calculateAccessibilityImpact(accessibility, baselineRevenue);

  // Generate summary headline
  const headline = generateHeadline(metrics);

  return {
    headline,
    baselineRevenue,
    speedLoss,
    speedSecLoss,
    a11yLoss,
  };
}

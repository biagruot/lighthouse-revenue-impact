import React from "react";

export interface ResultsData {
  headline: string;
  baselineRevenue: number;
  speedLoss: number;
  speedSecLoss: number;
  a11yLoss: number;
}

interface ResultsProps {
  data: ResultsData;
  formatCurrency: (n: number) => string;
}

const Results: React.FC<ResultsProps> = ({ data, formatCurrency }) => (
  <section className="space-y-5 mt-6">
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="text-gray-800 text-lg font-semibold mb-2">{data.headline || "—"}</div>
      <div className="mt-2">
        <span className="block text-sm font-medium text-gray-900">Baseline monthly revenue</span>
        <span className="block text-3xl font-bold text-green-700 mt-1">{formatCurrency(data.baselineRevenue)}</span>
      </div>
    </div>
    <div className="space-y-2">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <span className="text-red-700 font-semibold block mb-1">Estimated money lost due to slow performance</span>
  <span className="block text-2xl font-bold text-red-700 mt-1">{formatCurrency(data.speedLoss)}</span>
        <p className="mt-2 text-gray-800 text-base">Every month, your shop may lose this much because the site is slower than recommended. Making your site faster can help recover this money.</p>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <span className="text-yellow-700 font-semibold block mb-1">Estimated money lost due to accessibility issues</span>
  <span className="block text-2xl font-bold text-yellow-700 mt-1">{formatCurrency(data.a11yLoss)}</span>
        <p className="mt-2 text-gray-800 text-base">Improving accessibility helps more people complete purchases, increasing your revenue.</p>
      </div>
    </div>
    <div className="pt-3 border-t border-dashed border-gray-200">
      <h3 className="text-sm font-semibold mb-2">Research Basis</h3>
      <div className="space-y-2 text-xs text-gray-600">
        <div className="bg-blue-50 rounded-md p-3">
          <p className="font-medium text-blue-900 mb-1">Deloitte Study (2020)</p>
          <p>37 brands, 30M sessions over 4 weeks. Found 8.4% conversion lift per 0.1s improvement across 4 speed metrics (LCP, CLS, INP, TBT).</p>
        </div>
        <div>
          <p className="font-medium mb-1">Our Methodology:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Use all available Core Web Vitals metrics (same as original study)</li>
            <li>Apply full 8.4% impact rate across combined metric gaps</li>
            <li>Cap results at 50% to prevent unrealistic projections</li>
            <li>Targets: LCP 2.5s, CLS 0.1, INP 200ms, TBT 200ms</li>
          </ul>
        </div>
      </div>
      <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-xs mt-3">
        <li><a className="underline" href="https://www.thinkwithgoogle.com/_qs/documents/9757/Milliseconds_Make_Millions_report_hQYAbZJ.pdf" target="_blank" rel="noreferrer">Deloitte: Milliseconds Make Millions (2020)</a></li>
        <li><span>Accessibility: Conservative estimate, limited global benchmarks</span></li>
      </ol>
    </div>
    <div className="text-xs text-gray-700 bg-red-50 border border-red-200 rounded-md p-3 mt-2">
      <p className="font-bold text-red-800 mb-2">⚠️ LEGAL DISCLAIMER</p>
      <p className="mb-2">
        <strong>These are statistical estimates only - not guaranteed results.</strong> 
        Calculations are based on third-party research and may not apply to your specific business, 
        industry, or market conditions.
      </p>
      <p className="mb-2">
        <strong>No warranty or guarantee is provided.</strong> The author assumes no responsibility 
        for business decisions made based on these estimates. Always validate with real A/B testing, 
        user data, and professional consultation before making significant changes.
      </p>
      <p>
        <strong>Use at your own risk.</strong> This tool is for educational purposes only and does not 
        constitute financial, business, or professional advice.
      </p>
    </div>
  </section>
);

export default Results;

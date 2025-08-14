# Lighthouse Revenue Impact Calculator

> **Calculate the financial impact of website performance issues using real research data**

A React-based tool that translates Lighthouse performance metrics into estimated revenue loss, helping businesses understand the financial cost of poor website performance and accessibility.

![Lighthouse Revenue Impact](https://img.shields.io/badge/lighthouse-performance-blue) ![React](https://img.shields.io/badge/react-18.3.1-61dafb) ![TypeScript](https://img.shields.io/badge/typescript-5.5.4-blue) ![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.4.7-38bdf8)

## 🚀 Features

- **Research-Based Calculations**: Uses findings from Deloitte's "Milliseconds Make Millions" study (37 brands, 30M sessions)
- **Multiple Performance Metrics**: Analyzes all Core Web Vitals (LCP, CLS, INP, TBT) exactly as the original research
- **Business Impact Translation**: Converts technical metrics into concrete revenue loss estimates
- **Accessibility Analysis**: Estimates revenue impact from accessibility issues
- **Real Lighthouse Data**: Paste your actual Lighthouse JSON reports for accurate analysis
- **Multi-Currency Support**: Calculate impact in USD or EUR
- **Responsive Design**: Works on desktop and mobile devices

## 🎯 Use Cases

- **Performance Audits**: Quantify the business impact of performance improvements
- **Stakeholder Reporting**: Present performance issues in business terms
- **Budget Justification**: Make the case for performance optimization investments
- **Conversion Optimization**: Prioritize performance fixes by revenue impact
- **Client Presentations**: Show concrete financial benefits of web performance work

## 📊 How It Works

### Research Foundation

The calculator is based on Deloitte's 2020 study "Milliseconds Make Millions" which found:
- **8.4% conversion lift** per 0.1 second improvement across 4 speed metrics
- Analysis of **37 brands** over **4 weeks** (30 million sessions)
- Impact measured across **LCP, CLS, INP, and TBT** metrics

### Calculation Methodology

1. **Performance Gap Analysis**: Compares your metrics against Core Web Vitals targets
   - LCP: 2.5 seconds
   - CLS: 0.1
   - INP: 200ms  
   - TBT: 200ms

2. **Combined Impact Calculation**: Sums performance gaps across all available metrics

3. **Revenue Impact Modeling**: 
   - Primary: Applies Deloitte's 8.4% conversion impact per 0.1s delay
   - Fallback: Linear 2% revenue impact per second of combined delay
   - Capped at 50% maximum impact to prevent unrealistic projections

4. **Accessibility Impact**: Conservative 2% revenue impact based on accessibility score gap

## 🛠️ Installation

### Prerequisites
- Node.js 16.0.0 or higher
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/biagruot/lighthouse-revenue-impact.git
cd lighthouse-revenue-impact

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 📖 Usage

### 1. Get Your Lighthouse Data

Run Lighthouse on your website:

```bash
# Using Lighthouse CLI
lighthouse https://yourwebsite.com --output=json --output-path=report.json

# Or use Chrome DevTools -> Lighthouse tab -> Generate report
```

### 2. Input Business Metrics

- **Monthly Sessions**: Total website visits per month
- **Average Order Value**: Average purchase amount
- **Conversion Rate**: Percentage of visitors who purchase
- **Currency**: USD or EUR

### 3. Paste Lighthouse JSON

Copy the entire JSON output from your Lighthouse report and paste it into the application.

### 4. Analyze Results

The tool will show:
- Current performance metrics (LCP, CLS, INP, TBT)
- Estimated monthly revenue loss from performance issues
- Estimated monthly revenue loss from accessibility issues
- Baseline monthly revenue calculation

### Example Input

```json
{
  "categories": {
    "performance": { "score": 0.68 },
    "accessibility": { "score": 0.85 }
  },
  "audits": {
    "largest-contentful-paint": { "numericValue": 3200 },
    "cumulative-layout-shift": { "numericValue": 0.12 },
    "interaction-to-next-paint": { "numericValue": 180 },
    "total-blocking-time": { "numericValue": 220 }
  }
}
```

## 🧮 Technical Architecture

### Core Components

- **`src/utils/calculate.ts`**: Main calculation engine with Deloitte research implementation
- **`src/utils/lighthouse.ts`**: Lighthouse JSON parsing and metric extraction  
- **`src/components/Form.tsx`**: User input form for business metrics and Lighthouse data
- **`src/components/Results.tsx`**: Results display with methodology explanation

### Performance Benchmarks

```typescript
const PERFORMANCE_BENCHMARKS = {
  TARGET_LCP_SECONDS: 2.5,
  TARGET_CLS: 0.1,
  TARGET_INP_SECONDS: 0.2,
  TARGET_TBT_MS: 200,
  DELOITTE_BASE_IMPACT: 0.084, // 8.4% impact per 0.1s
  MAX_REALISTIC_IMPACT: 0.5,   // Cap at 50%
};
```

## 🔬 Research & Methodology

### Data Sources

1. **[Deloitte: Milliseconds Make Millions (2020)](https://www.thinkwithgoogle.com/_qs/documents/9757/Milliseconds_Make_Millions_report_hQYAbZJ.pdf)**
   - 37 brands analyzed
   - 30 million sessions over 4 weeks
   - 8.4% conversion lift per 0.1s improvement across 4 metrics

2. **Core Web Vitals Targets**
   - Based on Google's Core Web Vitals thresholds
   - LCP < 2.5s, CLS < 0.1, INP < 200ms, TBT < 200ms

### Limitations & Disclaimers

- **Estimates Only**: Results are projections based on industry research, not guarantees
- **Industry Variance**: Impact varies significantly by industry, audience, and business model
- **A/B Testing Recommended**: Validate results with real user testing for your specific site
- **Conservative Accessibility**: Accessibility impact estimates are conservative due to limited research

## ⚠️ Important Legal Disclaimers

**THE SOFTWARE AND ALL CALCULATIONS ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. USE AT YOUR OWN RISK.**

### No Guarantees or Warranties
- **Estimates Only**: All calculations are statistical estimates based on industry research, not guaranteed results
- **No Financial Advice**: This tool does not provide financial, business, or investment advice
- **Research-Based Models**: Results are projections based on third-party studies and may not apply to your specific situation
- **No Liability**: The author and contributors assume no responsibility for any business decisions made based on these estimates

### Your Responsibility
- **Validate Results**: Always validate estimates with your own A/B testing and user data
- **Professional Consultation**: Consult with qualified professionals before making significant business decisions
- **Independent Verification**: Verify all calculations independently before relying on them for business purposes
- **Risk Assessment**: You are solely responsible for assessing the risks and benefits of any performance optimizations

### Data Accuracy
- **Third-Party Research**: Calculations are based on Deloitte and other third-party research studies
- **Industry Variance**: Results vary significantly by industry, market, audience, and implementation
- **No Real-Time Data**: This tool does not access your actual business data or guarantee future performance
- **Approximations**: All calculations are approximations and should be treated as rough guidelines only

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Deloitte Digital**: For the comprehensive "Milliseconds Make Millions" research study
- **Google Lighthouse Team**: For providing the performance measurement framework
- **Web Performance Community**: For ongoing research and best practices

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/biagruot/lighthouse-revenue-impact/issues)

---

**⚠️ DISCLAIMER: This tool provides estimates only. Results are not guaranteed and should not be used as the sole basis for business decisions. Always validate with real user testing and consult qualified professionals before making significant changes.**

*Educational tool for understanding potential performance impact - not a substitute for professional analysis.*
# Lighthouse Revenue Impact Calculator

Calculate potential revenue loss from website performance issues using Lighthouse reports and research data from Deloitte's "Milliseconds Make Millions" study.

## What it does

- Takes your Lighthouse JSON report
- Analyzes Core Web Vitals (LCP, CLS, INP, TBT)  
- Shows estimated monthly revenue loss from slow performance
- Based on real research: 37 brands, 30M sessions

## How to use

1. Run Lighthouse on your website
2. Copy the JSON output  
3. Paste it into the tool
4. Enter your business metrics (monthly sessions, conversion rate, order value)
5. See estimated revenue loss

## Development

```bash
git clone https://github.com/biagruot/lighthouse-revenue-impact.git
cd lighthouse-revenue-impact
npm install
npm run dev
```

## Research basis

Based on Deloitte's "Milliseconds Make Millions" study:
- 37 brands, 30M sessions, 4 weeks
- Found 8.4% conversion lift per 0.1s improvement
- Uses same 4 metrics: LCP, CLS, INP, TBT

## ⚠️ Disclaimer

**Estimates only - not guaranteed results.** 

This is an educational tool based on industry research. Results vary by business and industry. Always validate with real A/B testing before making decisions. Use at your own risk.

---

MIT License. Educational tool only - estimates are not guaranteed.
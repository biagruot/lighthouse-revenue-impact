import React, { useState, useCallback } from "react";
import Guide from "./components/Guide";
import Form, { FormValues } from "./components/Form";
import Results, { ResultsData } from "./components/Results";
import { parseLighthouse } from "./utils/lighthouse";
import { formatCurrency } from "./utils/format";
import { calculateBusinessImpact } from "./utils/calculate";

const defaultLighthouse = `{
  "categories": {
    "performance": { "score": 0.68 },
    "accessibility": { "score": 0.85 },
    "seo": { "score": 0.92 },
    "best-practices": { "score": 0.93 }
  },
  "audits": {
    "largest-contentful-paint": { "numericValue": 3200 },
    "cumulative-layout-shift": { "numericValue": 0.12 },
    "interactive-to-next-paint": { "numericValue": 180 },
    "total-blocking-time": { "numericValue": 220 }
  }
}`;

const initialForm: FormValues = {
  monthlySessions: "100000",
  avgOrderValue: "45",
  conversionRate: "2.5",
  currencyCode: "USD",
  lhJSON: defaultLighthouse,
};

const App: React.FC = () => {
  const [form, setForm] = useState<FormValues>(initialForm);
  const [result, setResult] = useState<ResultsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((field: keyof FormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    setError(null);
    setResult(null);
    
    try {
      const metrics = parseLighthouse(form.lhJSON);
      const calc = calculateBusinessImpact({
        metrics,
        monthlySessions: form.monthlySessions,
        avgOrderValue: form.avgOrderValue,
        conversionRate: form.conversionRate,
      });
      
      if ('error' in calc) {
        setError(calc.error);
        return;
      }
      
      setResult(calc);
    } catch (err) {
      setError('An unexpected error occurred while processing your request.');
    }
  }, [form]);

  return (
    <main className="max-w-2xl mx-auto p-4 md:p-8 space-y-6">
      <Guide />
      <Form values={form} onChange={handleChange} onSubmit={handleSubmit} />
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <p className="text-red-600 text-base font-semibold">{error}</p>
        </div>
      )}
      {result && (
        <Results
          data={result}
          formatCurrency={(n) => formatCurrency(n, form.currencyCode)}
        />
      )}
    </main>
  );
};

export default App;

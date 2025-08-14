import React from "react";

export interface FormValues {
  monthlySessions: string;
  avgOrderValue: string;
  conversionRate: string;
  currencyCode: "USD" | "EUR";
  lhJSON: string;
}

interface FormProps {
  values: FormValues;
  onChange: (field: keyof FormValues, value: string) => void;
  onSubmit: () => void;
}

const Form: React.FC<FormProps> = ({ values, onChange, onSubmit }) => (
  <form
    className="grid gap-4"
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
    aria-label="Performance analysis form"
  >
    <div>
      <label htmlFor="sessions" className="block text-sm font-medium text-gray-900">
        Monthly shop visits
      </label>
      <input
        id="sessions"
        type="text"
        inputMode="numeric"
        min={0}
        value={values.monthlySessions}
        onChange={(e) => onChange("monthlySessions", e.target.value)}
        required
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
      />
      <span className="text-xs text-gray-500 block mt-1">
        Tip: Enter the total number of visits your shop gets in a month. Example: 1800000
      </span>
    </div>
    <div>
      <label htmlFor="aov" className="block text-sm font-medium text-gray-900">
        Average order value ({values.currencyCode})
      </label>
      <input
        id="aov"
        type="text"
        inputMode="decimal"
        min={0}
        value={values.avgOrderValue}
        onChange={(e) => onChange("avgOrderValue", e.target.value)}
        required
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
      />
      <span className="text-xs text-gray-500 block mt-1">
        Tip: Enter the average amount spent per order. Example: 45
      </span>
    </div>
    <div>
      <label htmlFor="cr" className="block text-sm font-medium text-gray-900">
        Conversion rate (%)
      </label>
      <input
        id="cr"
        type="text"
        inputMode="decimal"
        step="0.1"
        min={0}
        max={100}
        value={values.conversionRate}
        onChange={(e) => onChange("conversionRate", e.target.value)}
        required
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
      />
      <span className="text-xs text-gray-500 block mt-1">
        Tip: Enter the percentage of visitors who make a purchase. Example: 2.5
      </span>
    </div>
    <div>
      <label htmlFor="currency" className="block text-sm font-medium text-gray-900">
        Currency
      </label>
      <select
        id="currency"
        value={values.currencyCode}
        onChange={(e) => onChange("currencyCode", e.target.value as "USD" | "EUR")}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
      </select>
      <span className="text-xs text-gray-500 block mt-1">
        Tip: Choose the currency for your shop's revenue.
      </span>
    </div>
    <div>
      <label htmlFor="lh" className="block text-sm font-medium text-gray-900">
        Paste Lighthouse JSON
      </label>
      <textarea
        id="lh"
        rows={8}
        placeholder="Paste full Lighthouse JSON here"
        value={values.lhJSON}
        onChange={(e) => onChange("lhJSON", e.target.value)}
        required
        className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono mt-1"
      />
      <span className="text-xs text-gray-500 block mt-1">
        Tip: Copy and paste the full JSON from your own Lighthouse report for best results. 
        The example is just a starting point.
      </span>
    </div>
    <button 
      type="submit" 
      className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium border bg-gray-900 text-white border-gray-900 mt-2"
    >
      Show Results
    </button>
  </form>
);

export default Form;

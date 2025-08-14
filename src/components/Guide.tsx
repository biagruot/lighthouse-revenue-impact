import React from "react";

const Guide: React.FC = () => (
  <section className="mb-6">
    <h1 className="text-2xl font-bold mb-2">How much money is lost?</h1>
    <p className="text-base text-gray-700 mb-3">
      Paste your own Lighthouse JSON below. We start with an example, but for real results, use your own data. Enter your shop's numbers and see, in plain language, how much money is lost due to slow performance and accessibility gaps.
    </p>
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
      <p className="text-sm text-yellow-800">
        <strong>⚠️ Educational Tool:</strong> Results are statistical estimates only, not guaranteed outcomes. 
        Always validate with real testing before making business decisions.
      </p>
    </div>
  </section>
);

export default Guide;

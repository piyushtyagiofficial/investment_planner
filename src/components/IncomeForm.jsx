import React, { useState } from 'react';
import { IndianRupee, AlertCircle } from 'lucide-react';
import useStore from '../store/InvestmentStore';
import getInvestmentSuggestions from '../services/gemini';

export function IncomeForm() {
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState("")
  
  const {
    monthlyIncome,
    setMonthlyIncome,
    setInvestmentPlan,
    setError,
    riskLevel,
    setRiskLevel,
    addToHistory,
    setStrategy,
  } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    if (income < 1000) {
      setError('Monthly income must be at least ₹1,000');
      setLoading(false);
      return;
    }
  
    setMonthlyIncome(parseFloat(income));
    setRiskLevel(riskLevel);
  
    try {
        // Pass monthlyIncome and riskLevel to getInvestmentSuggestions
        const response = await getInvestmentSuggestions(income, riskLevel);
        const cleaned = response.replace(/```json|```/g, '').trim();
        const json = JSON.parse(cleaned);
  
        setStrategy(json);
        addToHistory();

    } catch (error) {
      console.error(error);
      setError('Failed to get investment suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
          <select
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your monthly income"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min="1000"
            />
          </div>
        </div>

        {useStore.getState().error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle size={20} />
            <p className="text-sm">{useStore.getState().error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {loading ? 'Getting suggestions...' : 'Get Investment Plan'}
        </button>
      </form>
    </div>
  );
}

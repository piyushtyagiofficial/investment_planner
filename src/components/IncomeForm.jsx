import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { IndianRupee, AlertCircle } from 'lucide-react';
import useStore from '../store/InvestmentStore';
import getInvestmentSuggestions from '../services/gemini';

export function IncomeForm() {
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState("");

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
      setError('Monthly Savings must be at least ₹1,000');
      setLoading(false);
      return;
    }

    setMonthlyIncome(parseFloat(income));
    setRiskLevel(riskLevel);

    try {
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
      setIncome('');
      
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Savings</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your monthly savings"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min="1000"
            />
          </div>
        </motion.div>

        {useStore.getState().error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg"
          >
            <AlertCircle size={20} />
            <p className="text-sm">{useStore.getState().error}</p>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {loading ? 'Getting suggestions...' : 'Get Investment Plan'}
        </motion.button>
      </form>
    </div>
  );
}

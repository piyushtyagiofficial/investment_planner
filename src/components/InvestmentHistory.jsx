import React from 'react';
import { motion } from 'framer-motion';
import useStore from '../store/InvestmentStore';

export function InvestmentHistory() {
  const { history } = useStore();

  if (!history || history.length === 0) return null;

  return (
    <div className="space-y-6">
      {history.map((entry, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`p-6 rounded-2xl shadow-md transition-transform transform hover:scale-[1.02] ${
            index === 0
              ? 'bg-blue-50 border-2 border-blue-500'
              : 'bg-white border border-gray-200'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {index === 0 ? 'Current Investment Plan' : 'Past Plan'}
          </h2>
          <div className="border-b pb-4 border-gray-300">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">{entry.date}</p>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  entry.riskLevel === 'low'
                    ? 'bg-green-100 text-green-800'
                    : entry.riskLevel === 'moderate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {entry.riskLevel.charAt(0).toUpperCase() + entry.riskLevel.slice(1)}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Monthly Income: <span className="font-bold">₹{entry.monthlyIncome}</span>
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 mt-2">
              {entry.strategy?.allocations?.map(item => (
                <p key={item.category}>
                  {item.category}:{' '}
                  <span className="font-semibold">
                    ₹{Math.round((item.percentage / 100) * entry.monthlyIncome)}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

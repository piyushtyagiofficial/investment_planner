import React from 'react';
import useStore from '../store/InvestmentStore';

export function InvestmentHistory() {
  const { history } = useStore();

  if (!history || history.length === 0) return null;

  return (
    <div className="space-y-6">
      {history.map((entry, index) => (
        <div
          key={index}
          className={`bg-white p-6 rounded-lg shadow-sm ${
            index === 0 ? 'border-2 border-blue-500' : 'border'
          }`}
        >
          <h2 className="text-lg font-medium mb-4">
            {index === 0 ? 'Current Investment Plan' : `Past Plan`}
          </h2>
          <div className="border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">{entry.date}</p>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                {entry.riskLevel}
              </span>
            </div>
            <p className="text-sm font-medium">Income: ₹{entry.monthlyIncome}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              {entry.strategy?.allocations?.map(item => (
                <p key={item.category}>
                  {item.category}: ₹{Math.round((item.percentage / 100) * entry.monthlyIncome)}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

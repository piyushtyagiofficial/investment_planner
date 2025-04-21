import React from 'react';
import { BarChart3 } from 'lucide-react';
import { IncomeForm } from './components/IncomeForm';
import { InvestmentChart } from './components/InvestmentChart';
import { InvestmentHistory } from './components/InvestmentHistory';
import { DownloadPDF } from './components/DownloadPDF';
import useStore from './store/InvestmentStore';

function App() {
  const { monthlyIncome } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <BarChart3 className="text-blue-600" size={24} />
            <h1 className="text-xl font-semibold text-gray-900">Personal Investment Planner</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Enter Your Income</h2>
              <IncomeForm />
            </div>
            
            <InvestmentHistory />
            
            {monthlyIncome > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Download Report</h2>
                  <DownloadPDF />
                </div>
              </div>
            )}
          </div>

          {monthlyIncome > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Investment Distribution</h2>
              <InvestmentChart />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
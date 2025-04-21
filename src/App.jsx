import React from 'react';
import { IncomeForm } from './components/IncomeForm';
import { InvestmentChart } from './components/InvestmentChart';
import { InvestmentHistory } from './components/InvestmentHistory';
import { DownloadPDF } from './components/DownloadPDF';
import useStore from './store/InvestmentStore';
import { motion } from 'framer-motion';
import { Header } from './components/Header';

function App() {
  const { monthlyIncome } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Left Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg"
            >
              <h2 className="text-lg font-medium mb-4">Enter Your Income</h2>
              <IncomeForm />
            </motion.div>

            <InvestmentHistory />

            {monthlyIncome > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Download Detailed Report</h2>
                  <DownloadPDF />
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {monthlyIncome > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-lg w-full h-full"
              >
                <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b border-blue-300 pb-2">
                  📊 Investment Distribution
                </h2>
                <div className="w-full flex justify-center items-center h-[500px]">
                  <InvestmentChart />
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

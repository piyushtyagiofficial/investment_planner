import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

export const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm w-full">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full px-4 py-5 sm:px-6 lg:px-8"
      >
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "backOut" }}
          >
            <BarChart3 className="text-blue-600" size={28} />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            Investment Planner
          </h1>
        </div>
      </motion.div>
    </div>
  );
};

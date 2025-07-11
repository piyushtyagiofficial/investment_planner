import React from 'react';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import useStore from '../store/InvestmentStore';
import { motion } from 'framer-motion';

export function DownloadPDF() {
  const { monthlyIncome, riskLevel, strategy } = useStore();

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Personal Investment Plan', 20, 20);

    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Monthly Income: Rs. ${monthlyIncome}`, 20, 40);
    doc.text(`Risk Profile: ${riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}`, 20, 50);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Investment Breakdown:', 20, 70);

    let yPosition = 80;

    strategy.allocations.forEach((item) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${item.category}: Rs. ${Math.round((item.percentage / 100) * monthlyIncome)}`, 30, yPosition);

      item.funds.forEach((fund, fundIndex) => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`  - ${fund}`, 40, yPosition + (fundIndex + 1) * 10);
      });

      yPosition += (item.funds.length + 1) * 10 + 20;
    });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Investment Strategy Recommendations:', 20, yPosition);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    if (riskLevel === 'conservative') {
      doc.text('- Focus on building emergency fund and stable investments', 30, yPosition + 10);
      doc.text('- Minimize exposure to volatile assets like crypto', 30, yPosition + 20);
      doc.text('- Consider increasing gold allocation for stability', 30, yPosition + 30);
    } else if (riskLevel === 'moderate') {
      doc.text('- Maintain a balanced portfolio across all asset classes', 30, yPosition + 10);
      doc.text('- Regular monthly SIP investments for steady growth', 30, yPosition + 20);
      doc.text('- Moderate exposure to high-risk, high-reward assets', 30, yPosition + 30);
    } else {
      doc.text('- Higher allocation to equity mutual funds through SIP', 30, yPosition + 10);
      doc.text('- Strategic position in cryptocurrency market', 30, yPosition + 20);
      doc.text('- Maintain emergency fund despite aggressive strategy', 30, yPosition + 30);
    }

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, yPosition + 50);

    doc.save('investment-plan.pdf');
  };

  return (
    <motion.button
      onClick={handleDownload}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      <Download size={20} />
      Download Plan
    </motion.button>
  );
}

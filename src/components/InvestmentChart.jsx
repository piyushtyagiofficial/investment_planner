import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import useStore from '../store/InvestmentStore';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

export function InvestmentChart() {
    const { strategy } = useStore();
  
    if (!strategy || !strategy.allocations) {
      return null; // or a loading indicator
    }
  
    const chartData = {
      labels: strategy.allocations.map(item => item.category),
      datasets: [
        {
          data: strategy.allocations.map(item => item.percentage),
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',

          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <div className="w-full max-w-md">
        <Pie data={chartData} />
      </div>
    );
  }
  
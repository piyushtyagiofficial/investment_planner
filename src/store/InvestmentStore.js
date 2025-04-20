import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useInvestmentStore = create(
  persist(
    (set, get) => ({
      monthlyIncome: 0,
      riskLevel: 'moderate',
      investmentPlan: {
        sip: 0,
        crypto: 0,
        gold: 0,
        equity: 0,
      },
      strategy: '',
      history: [],
      error: null,
      setStrategy: (strategy) => set({ strategy }),
      setMonthlyIncome: (income) => set({ monthlyIncome: income }),
      setRiskLevel: (level) => set({ riskLevel: level }),
      setInvestmentPlan: (plan) => set({ investmentPlan: plan }),
      addToHistory: () => set((state) => ({
        history: [...state.history, {
          date: new Date().toISOString(),
          income: state.monthlyIncome,
          plan: state.investmentPlan,
          riskLevel: state.riskLevel,
        }],
      })),
      setError: (error) => set({ error }),
    }),
    {
      name: 'investment-storage',
    }
  )
);
import { create } from 'zustand';

const useStore = create((set, get) => ({
  monthlyIncome: '',
  riskLevel: 'moderate',
  investmentPlan: {
    sips: 0,
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
  addToHistory: () => {
    const { monthlyIncome, riskLevel, strategy, history } = get();
    if (strategy) {
      set({
        history: [
          {
            date: new Date().toLocaleString('en-IN'),
            monthlyIncome,
            riskLevel,
            strategy
          },
          ...history,
        ]
      });
    }
  },
  setError: (error) => set({ error }),
}));

export default useStore;

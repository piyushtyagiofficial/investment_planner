import { GoogleGenerativeAI } from '@google/generative-ai';
import useStore from '../store/InvestmentStore';

export default async function getInvestmentSuggestions() {
  const { monthlyIncome, riskLevel } = useStore.getState();

  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    You are a financial advisor AI.
    
    Generate an investment strategy for a user who can invest ₹${monthlyIncome} per month and has a ${riskLevel} risk tolerance.

    Limit upto 5 categories of investment.



    Return the result in **pure JSON format only**. Do not include any explanations or markdown.
    
    Use this format:
    {
      "allocations": [
        { "category": "SIPs", "percentage": 50, "funds": ["Fund A", "Fund B"] },
        { "category": "Crypto", "percentage": 10, "funds": ["Bitcoin", "Ethereum"] },
        { "category": "Gold", "percentage": 15, "funds": ["SGBs", "Gold ETF"] },
        { "category": "Equity", "percentage": 25, "funds": ["Nifty 50", "Mid-cap Stocks"] }
        { "category": "Bonds", "percentage": 10, "funds": ["Government Bonds", "Corporate Bonds"] }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (error) {
    console.error('Error fetching strategy from Gemini:', error);
    throw error; 
  }
}

import { GoogleGenerativeAI } from '@google/generative-ai';
import useStore from '../store/InvestmentStore';

export async function getInvestmentSuggestions(monthlyIncome, riskLevel) {

    const { setStrategy } = useStore.getState();
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
    You are a financial advisor AI.
    
    Generate an investment strategy for a user who can invest ₹${income} per month and has a ${riskProfile} risk tolerance.
    
    The strategy must include the following allocation ranges:
    - SIPs: 40% to 60%
    - Crypto: 5% to 15%
    - Gold: 10% to 20%
    - Equity: Remaining amount
    
    Return the result in **pure JSON format only**. Do not include any explanations or markdown.
    
    Use this format:
    {
      "allocations": [
        { "category": "SIPs", "percentage": 50, "funds": ["Fund A", "Fund B"] },
        { "category": "Crypto", "percentage": 10, "funds": ["Bitcoin", "Ethereum"] },
        { "category": "Gold", "percentage": 15, "funds": ["SGBs", "Gold ETF"] },
        { "category": "Equity", "percentage": 25, "funds": ["Nifty 50", "Mid-cap Stocks"] }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    const cleaned = text.replace(/```json|```/g, '').trim();

    const json = JSON.parse(cleaned);
    setStrategy(json); 
    console.log('Investment strategy:', json);
  } catch (error) {
    console.error('Error fetching strategy from Gemini:', error);
  }
}
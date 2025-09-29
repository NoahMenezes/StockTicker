
// src/gemini.js (or aiConfig.js)

import { GoogleGenerativeAI } from '@google/generative-ai';

// ⚠️ IMPORTANT: Replace this with your actual Gemini API Key.
// Use environment variables (process.env.GEMINI_API_KEY) in a secure setup.
const GEMINI_API_KEY = "AIzaSyBtLcOleNG3Qn38_7eDaPZIQmG3xA6bt6E"; 

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const MODEL_NAME = 'gemini-1.5-flash'; // Correct model name
/**
 * Converts the raw stock data into a compelling trading report using Gemini.
 * @param {string} data - The raw JSON string containing stock aggregation data.
 * @param {function} renderReport - Callback function to display the final report content.
 */
export async function generateStockReport(tickers) {
    try {
        // Get the model
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        
        // Create mock stock data for the tickers (since we don't have real API)
        const mockData = tickers.map(ticker => ({
            symbol: ticker,
            openPrice: (Math.random() * 200 + 50).toFixed(2),
            closePrice: (Math.random() * 200 + 50).toFixed(2),
            change: ((Math.random() - 0.5) * 20).toFixed(2)
        }));
        
        const prompt = `You are a fun, energetic trading guru! Write a brief, exciting report (max 150 words) about these stocks: ${tickers.join(', ')}. 
        
        Here's the mock data: ${JSON.stringify(mockData)}
        
        Write in a fun, high-energy style like: "OK baby, hold on tight! These stocks are going WILD!" 
        Give buy/hold/sell recommendations and make it entertaining!`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        return text;
        
    } catch (error) {
        console.error('Error generating report:', error);
        throw new Error('Failed to generate report. Please try again.');
    }
}
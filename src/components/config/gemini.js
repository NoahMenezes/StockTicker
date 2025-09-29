// src/components/config/gemini.js

import { GoogleGenerativeAI } from '@google/generative-ai';

// ⚠️ IMPORTANT: Add your Gemini API Key here or use environment variables
// Get your free API key from: https://makersuite.google.com/app/apikey
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

// Debug: Log environment variable status
console.log('🔍 Environment Debug:');
console.log('- All env vars:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP')));
console.log('- GEMINI_API_KEY:', GEMINI_API_KEY ? 'Found (length: ' + GEMINI_API_KEY.length + ')' : 'Not found');
console.log('- Raw value:', process.env.REACT_APP_GEMINI_API_KEY);

// Initialize Gemini AI
let genAI;
const MODEL_NAME = 'gemini-2.0-flash';

// Initialize only if API key exists
if (GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

// Removed complex API integration for now - focusing on Gemini AI working first

/**
 * Generate realistic mock data when API is unavailable
 * @param {string} symbol - Stock ticker symbol
 * @returns {Object} Mock stock data
 */
function generateMockData(symbol) {
    const basePrice = Math.random() * 200 + 50; // Random price between $50-$250
    const volatility = 0.03; // 3% daily volatility
    
    // Generate 3 days of data
    const threeDaysAgo = basePrice;
    const twoDaysAgo = threeDaysAgo * (1 + (Math.random() - 0.5) * volatility);
    const yesterday = twoDaysAgo * (1 + (Math.random() - 0.5) * volatility);
    const today = yesterday * (1 + (Math.random() - 0.5) * volatility);
    
    // Calculate overall 3-day change
    const totalChange = today - threeDaysAgo;
    const totalChangePercent = ((totalChange / threeDaysAgo) * 100).toFixed(2);
    
    // Calculate daily changes
    const day1Change = ((twoDaysAgo - threeDaysAgo) / threeDaysAgo * 100).toFixed(2);
    const day2Change = ((yesterday - twoDaysAgo) / twoDaysAgo * 100).toFixed(2);
    const day3Change = ((today - yesterday) / yesterday * 100).toFixed(2);
    
    return {
        symbol: symbol,
        dates: {
            threeDaysAgo: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
            twoDaysAgo: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
            yesterday: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            today: new Date().toISOString().split('T')[0]
        },
        prices: {
            threeDaysAgo: threeDaysAgo.toFixed(2),
            twoDaysAgo: twoDaysAgo.toFixed(2),
            yesterday: yesterday.toFixed(2),
            today: today.toFixed(2)
        },
        dailyChanges: {
            day1: day1Change,
            day2: day2Change,
            day3: day3Change
        },
        overall: {
            change: totalChange.toFixed(2),
            changePercent: totalChangePercent
        },
        volume: Math.floor(Math.random() * 15000000) + 2000000, // 2M-17M volume
        marketCap: (Math.random() * 500 + 50).toFixed(1) + 'B' // 50B-550B market cap
    };
}

/**
 * Generate AI-powered stock report using Gemini
 * @param {Array} tickers - Array of stock ticker symbols
 * @returns {string} Generated stock report
 */
export async function generateStockReport(tickers) {
    try {
        // Check if API key is configured
        if (!GEMINI_API_KEY) {
            throw new Error('❌ Gemini API key not found! Please add REACT_APP_GEMINI_API_KEY to your .env file');
        }
        
        // Initialize Gemini AI if not already done
        if (!genAI) {
            genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        }
        
        console.log('🚀 Starting report generation for:', tickers);
        console.log('🔑 API Key status:', GEMINI_API_KEY ? 'Found' : 'Missing');
        
        // Generate mock data for demonstration (you can replace this with real API calls)
        const stocksData = tickers.map(ticker => generateMockData(ticker));
        console.log('📊 Generated mock data:', stocksData);
        
        // Get Gemini model
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        
        // Create a clean, professional prompt with 3-day data
        const prompt = `You are a professional stock analyst. Analyze the following stocks based on their 3-day performance data and provide a clean, readable report (max 200 words). 

IMPORTANT: Write in plain text format without any markdown formatting, asterisks, or special characters. Use simple, clear language.

STOCK PERFORMANCE DATA (Past 3 Days):
${stocksData.map(stock => `
${stock.symbol} Analysis:
- 3 Days Ago (${stock.dates.threeDaysAgo}): $${stock.prices.threeDaysAgo}
- 2 Days Ago (${stock.dates.twoDaysAgo}): $${stock.prices.twoDaysAgo} (${stock.dailyChanges.day1 > 0 ? '+' : ''}${stock.dailyChanges.day1}%)
- Yesterday (${stock.dates.yesterday}): $${stock.prices.yesterday} (${stock.dailyChanges.day2 > 0 ? '+' : ''}${stock.dailyChanges.day2}%)
- Today (${stock.dates.today}): $${stock.prices.today} (${stock.dailyChanges.day3 > 0 ? '+' : ''}${stock.dailyChanges.day3}%)
- 3-Day Total Change: ${stock.overall.changePercent > 0 ? '+' : ''}${stock.overall.changePercent}%
- Volume: ${stock.volume.toLocaleString()} shares
- Market Cap: $${stock.marketCap}
`).join('\n')}

For each stock, provide in plain text:
1. Trend Analysis: Is it trending up, down, or sideways?
2. Key Insights: What does the 3-day pattern tell us?
3. Action: Clear BUY/HOLD/SELL recommendation with reasoning
4. Risk Level: Low/Medium/High based on volatility

Write in normal paragraphs without bold text, asterisks, or markdown. Keep it professional, informative, and easy to read.`;

        console.log('🤖 Sending request to Gemini AI...');
        console.log('📝 Prompt preview:', prompt.substring(0, 200) + '...');
        
        // Generate the report
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const reportText = response.text();
        
        console.log('✅ Report generated successfully!');
        console.log('📄 Report preview:', reportText.substring(0, 100) + '...');
        return reportText;
        
    } catch (error) {
        console.error('❌ Error generating stock report:', error);
        
        // Provide specific error messages
        if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key')) {
            throw new Error('🔑 Invalid Gemini API key! Please check your .env file and make sure REACT_APP_GEMINI_API_KEY is correct.');
        } else if (error.message.includes('quota') || error.message.includes('QUOTA_EXCEEDED')) {
            throw new Error('📊 API quota exceeded! Please wait a moment and try again, or check your Gemini API usage.');
        } else if (error.message.includes('not found')) {
            throw new Error('❌ Gemini API key not found! Please add REACT_APP_GEMINI_API_KEY to your .env file');
        } else {
            // If all else fails, provide a fallback report
            console.warn('🔄 Falling back to demo report due to error:', error.message);
            const fallbackData = tickers.map(ticker => generateMockData(ticker));
            return generateFallbackReport(tickers, fallbackData);
        }
    }
}

/**
 * Generate a fallback report when Gemini API is unavailable
 * @param {Array} tickers - Array of stock ticker symbols
 * @param {Array} stocksData - Mock stock data
 * @returns {string} Fallback report
 */
function generateFallbackReport(tickers, stocksData) {
    const reports = stocksData.map(stock => {
        const trend = parseFloat(stock.overall.changePercent) > 0 ? 'UPWARD' : 'DOWNWARD';
        const volatility = Math.max(Math.abs(stock.dailyChanges.day1), Math.abs(stock.dailyChanges.day2), Math.abs(stock.dailyChanges.day3));
        const riskLevel = volatility > 3 ? 'HIGH' : volatility > 1.5 ? 'MEDIUM' : 'LOW';
        const recommendation = Math.abs(stock.overall.changePercent) > 3 ? 'BUY' : 'HOLD';
        
        return `${stock.symbol} (3-Day Analysis):
Trend: ${trend} trend with ${stock.overall.changePercent}% total change
Current Price: $${stock.prices.today}
Recommendation: ${recommendation}
Risk Level: ${riskLevel}
Volume: ${stock.volume.toLocaleString()} shares`;
    });
    
    const positiveStocks = stocksData.filter(s => parseFloat(s.overall.changePercent) > 0).length;
    
    return `EchoTicker 3-Day Stock Analysis

${reports.join('\n\n')}

Portfolio Summary:
${positiveStocks} out of ${stocksData.length} stocks showing positive 3-day performance
Average volume: ${Math.round(stocksData.reduce((sum, s) => sum + s.volume, 0) / stocksData.length).toLocaleString()} shares

Note: This is demo mode. Connect your Gemini API key for full AI-powered analysis with detailed market insights and recommendations.

All data represents the past 3 trading days for comprehensive trend analysis.`;
}

/**
 * Test function to verify API connection
 * @returns {boolean} True if API is working
 */
export async function testGeminiConnection() {
    try {
        if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
            return false;
        }
        
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
        const result = await model.generateContent("Say 'API connection successful' if you can read this.");
        const response = await result.response;
        
        return response.text().includes('successful');
    } catch (error) {
        console.error('Gemini API test failed:', error);
        return false;
    }
}
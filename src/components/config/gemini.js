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
        
        // Create an enhanced, informative prompt for amazing output
        const prompt = `You are an elite Wall Street analyst with 15+ years of experience. Create a comprehensive, visually appealing stock analysis report that looks professional and informative. Use emojis and formatting to make it engaging.

📊 MARKET DATA ANALYSIS (3-Day Performance Window):
${stocksData.map(stock => `
🏢 ${stock.symbol} - Complete Analysis:
📅 3 Days Ago (${stock.dates.threeDaysAgo}): $${stock.prices.threeDaysAgo}
📅 2 Days Ago (${stock.dates.twoDaysAgo}): $${stock.prices.twoDaysAgo} (${stock.dailyChanges.day1 > 0 ? '📈 +' : '📉 '}${stock.dailyChanges.day1}%)
📅 Yesterday (${stock.dates.yesterday}): $${stock.prices.yesterday} (${stock.dailyChanges.day2 > 0 ? '📈 +' : '📉 '}${stock.dailyChanges.day2}%)
📅 Today (${stock.dates.today}): $${stock.prices.today} (${stock.dailyChanges.day3 > 0 ? '📈 +' : '📉 '}${stock.dailyChanges.day3}%)
💹 3-Day Performance: ${stock.overall.changePercent > 0 ? '🟢 +' : '🔴 '}${stock.overall.changePercent}%
📊 Trading Volume: ${stock.volume.toLocaleString()} shares
💰 Market Cap: $${stock.marketCap}
`).join('\n')}

Create a detailed, professional report with the following structure:

🎯 EXECUTIVE SUMMARY
Write a brief market overview highlighting the key performers and overall market sentiment.

📈 INDIVIDUAL STOCK ANALYSIS
For each stock, provide:
• 🔍 Trend Analysis: Detailed pattern recognition (bullish/bearish/consolidation)
• 💡 Key Technical Insights: What the price action reveals about market sentiment
• 🎯 Investment Recommendation: Clear BUY/HOLD/SELL with specific reasoning
• ⚠️ Risk Assessment: Volatility analysis and risk factors
• 🔮 Short-term Outlook: What to expect in the next few trading sessions

📊 PORTFOLIO INSIGHTS
• Overall portfolio performance summary
• Risk diversification analysis
• Market correlation observations

Use professional language but make it engaging with emojis and clear formatting. Aim for 250-300 words for comprehensive analysis.`;

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
        const trend = parseFloat(stock.overall.changePercent) > 0 ? '📈 BULLISH' : '📉 BEARISH';
        const trendIcon = parseFloat(stock.overall.changePercent) > 0 ? '🟢' : '🔴';
        const volatility = Math.max(Math.abs(stock.dailyChanges.day1), Math.abs(stock.dailyChanges.day2), Math.abs(stock.dailyChanges.day3));
        const riskLevel = volatility > 3 ? '🔴 HIGH' : volatility > 1.5 ? '🟡 MEDIUM' : '🟢 LOW';
        const recommendation = Math.abs(stock.overall.changePercent) > 3 ? '🎯 BUY' : '🤝 HOLD';
        
        return `🏢 ${stock.symbol} - Professional Analysis:
🔍 Trend Analysis: ${trend} momentum detected
💹 3-Day Performance: ${trendIcon} ${stock.overall.changePercent}% total change
💰 Current Price: $${stock.prices.today}
🎯 Investment Action: ${recommendation}
⚠️ Risk Assessment: ${riskLevel} volatility
📊 Trading Volume: ${stock.volume.toLocaleString()} shares
🔮 Outlook: ${parseFloat(stock.overall.changePercent) > 2 ? 'Strong momentum continues' : parseFloat(stock.overall.changePercent) < -2 ? 'Watch for reversal signals' : 'Consolidation phase expected'}`;
    });
    
    const positiveStocks = stocksData.filter(s => parseFloat(s.overall.changePercent) > 0).length;
    const avgVolume = Math.round(stocksData.reduce((sum, s) => sum + s.volume, 0) / stocksData.length);
    const marketSentiment = positiveStocks > stocksData.length / 2 ? '🟢 BULLISH' : positiveStocks < stocksData.length / 2 ? '🔴 BEARISH' : '🟡 NEUTRAL';
    
    return `🎯 EXECUTIVE SUMMARY
Market sentiment appears ${marketSentiment.toLowerCase()} based on your selected portfolio. ${positiveStocks} out of ${stocksData.length} stocks showing positive momentum over the 3-day analysis window.

📈 INDIVIDUAL STOCK ANALYSIS

${reports.join('\n\n')}

📊 PORTFOLIO INSIGHTS
• Market Sentiment: ${marketSentiment}
• Portfolio Performance: ${positiveStocks}/${stocksData.length} stocks in positive territory
• Average Trading Volume: ${avgVolume.toLocaleString()} shares
• Risk Diversification: ${stocksData.length > 1 ? 'Well diversified across ' + stocksData.length + ' positions' : 'Single position - consider diversification'}

⚠️ DEMO MODE ACTIVE
Connect your Gemini API key for comprehensive AI-powered analysis including:
• Advanced technical indicators
• Market correlation analysis  
• Sector-specific insights
• Professional trading recommendations

💡 Analysis Period: Past 3 trading days for optimal trend identification`;
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
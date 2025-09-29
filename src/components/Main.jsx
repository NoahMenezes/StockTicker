// src/components/Main/Main.jsx

import React, { useState, useCallback, useRef } from 'react';
import './Main.css';
import { generateStockReport } from './config/gemini';

const Main = () => {
    const [tickerInput, setTickerInput] = useState('');
    const [tickers, setTickers] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '', visible: false });
    const [animatingTicker, setAnimatingTicker] = useState('');
    const [generatedReport, setGeneratedReport] = useState('');
    const inputRef = useRef(null);
    const MAX_TICKERS = 3;

    // Show notification with auto-dismiss
    const showNotification = useCallback((message, type = 'info') => {
        setNotification({ message, type, visible: true });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, visible: false }));
        }, 3000);
    }, []);

    // Simplified add ticker function
    const handleAddTicker = useCallback((e) => {
        e?.preventDefault();
        const newTicker = tickerInput.trim().toUpperCase();

        if (!newTicker) {
            showNotification('Please enter a ticker symbol', 'warning');
            return;
        }

        if (!/^[A-Z]{1,5}$/.test(newTicker)) {
            showNotification('Ticker must be 1-5 letters only', 'error');
            return;
        }

        if (tickers.includes(newTicker)) {
            showNotification(`"${newTicker}" is already added`, 'warning');
            return;
        }

        if (tickers.length >= MAX_TICKERS) {
            showNotification(`Maximum ${MAX_TICKERS} tickers allowed`, 'warning');
            return;
        }

        // Add ticker
        setTickers(prev => [...prev, newTicker]);
        setTickerInput('');
        showNotification(`Added ${newTicker}`, 'success');
        
        // Focus back to input
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }, [tickerInput, tickers, showNotification]);

    // Enhanced remove ticker with animation
    const handleRemoveTicker = useCallback((tickerToRemove) => {
        setAnimatingTicker(tickerToRemove);
        setTimeout(() => {
            setTickers(prev => prev.filter(ticker => ticker !== tickerToRemove));
            setAnimatingTicker('');
            showNotification(`Removed ${tickerToRemove}`, 'info');
        }, 200);
    }, [showNotification]);

    // Real report generation with Gemini AI
    const handleGenerateReport = useCallback(async () => {
        if (tickers.length === 0) {
            showNotification("Add at least one ticker first", 'warning');
            return;
        }

        setIsGenerating(true);
        setGeneratedReport('');
        showNotification('Generating your AI-powered report...', 'info');

        try {
            const report = await generateStockReport(tickers);
            setGeneratedReport(report);
            showNotification(`Report generated successfully!`, 'success');
        } catch (error) {
            console.error('Report generation error:', error);
            showNotification(error.message, 'error');
        } finally {
            setIsGenerating(false);
        }
    }, [tickers, showNotification]);

    // Simple keyboard handling - just Enter to add
    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleAddTicker(e);
        }
    }, [handleAddTicker]);

    return (
        <main className="main-content-section">
            {/* Notification Toast */}
            {notification.visible && (
                <div className={`notification toast-${notification.type} ${notification.visible ? 'show' : ''}`}>
                    <div className="notification-content">
                        <span className="notification-icon">
                            {notification.type === 'success' && '✓'}
                            {notification.type === 'warning' && '⚠'}
                            {notification.type === 'error' && '✕'}
                            {notification.type === 'info' && 'ℹ'}
                        </span>
                        <span className="notification-message">{notification.message}</span>
                    </div>
                </div>
            )}

            <section className="ticker-input-panel">
                <div className="brand-section">
                    <h1 className="brand-title">EchoTicker</h1>
                    <div className="brand-subtitle">AI-Powered Stock Predictions</div>
                </div>
                
                <p className="input-label">
                    Add up to {MAX_TICKERS} stock tickers below to get a super accurate stock predictions report <span className="emoji">👇</span>
                </p>

                <div className="input-control-group">
                    <input
                        ref={inputRef}
                        type="text"
                        id="ticker-input"
                        className="ticker-input-field"
                        placeholder="Enter ticker (e.g., AAPL, MSFT)"
                        value={tickerInput}
                        onChange={(e) => setTickerInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        maxLength={5}
                        disabled={tickers.length >= MAX_TICKERS}
                        autoComplete="off"
                        spellCheck="false"
                    />
                    <button 
                        className="add-ticker-button"
                        onClick={handleAddTicker}
                        disabled={!tickerInput.trim() || tickers.length >= MAX_TICKERS}
                        type="button"
                    >
                        <span className="add-icon">+</span>
                    </button>
                </div>

                {/* Ticker Display Area */}
                <div className="ticker-display-area">
                    {tickers.length === 0 ? (
                        <div className="placeholder-container">
                            <div className="placeholder-icon">📊</div>
                            <p className="placeholder-text">Your tickers will appear here...</p>
                            <p className="placeholder-subtext">Start by adding your first stock symbol</p>
                        </div>
                    ) : (
                        <div className="ticker-grid">
                            {tickers.map(ticker => (
                                <div 
                                    key={ticker}
                                    className={`ticker-item ${animatingTicker === ticker ? 'removing' : ''}`}
                                >
                                    <span className="ticker-name">{ticker}</span>
                                    <button 
                                        className="remove-ticker-button"
                                        onClick={() => handleRemoveTicker(ticker)}
                                        aria-label={`Remove ${ticker}`}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Progress Bar */}
                <div className="progress-container">
                    <div className="progress-bar-background">
                        <div 
                            className="progress-bar-foreground"
                            style={{ width: `${(tickers.length / MAX_TICKERS) * 100}%` }}
                        ></div>
                    </div>
                    <span className="progress-text">{tickers.length} / {MAX_TICKERS} tickers added</span>
                </div>

                {/* Generate Report Button */}
                <button 
                    className="generate-report-button"
                    onClick={handleGenerateReport}
                    disabled={isGenerating || tickers.length === 0}
                >
                    {isGenerating ? (
                        <>
                            <span className="loading-spinner"></span>
                            <span>GENERATING...</span>
                        </>
                    ) : (
                        <>
                            <span>GENERATE REPORT</span>
                            <span className="button-icon">🚀</span>
                        </>
                    )}
                </button>

                <div className="tagline-container">
                    <p className="tagline">
                        Always correct 15% of the time! <span className="tagline-emoji">📈</span>
                    </p>
                </div>

                {/* Generated Report Display */}
                {generatedReport && (
                    <div className="report-container">
                        <h3 className="report-title">📊 Your AI Stock Report</h3>
                        <div className="report-content">
                            {generatedReport}
                        </div>
                    </div>
                )}
            </section>

            <footer className="main-footer">
                <span>&copy; 2024 EchoTicker</span>
                <span className="footer-divider">•</span>
                <span>This is not real financial advice!</span>
            </footer>
        </main>
    );
}

export default Main;

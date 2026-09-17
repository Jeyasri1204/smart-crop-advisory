import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Component Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#060911] text-slate-100 flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-xl space-y-4 glass-card p-8 rounded-3xl border border-red-500/30 text-left">
            <div className="text-4xl text-center">🌾</div>
            <h2 className="text-xl font-extrabold text-white text-center">Smart Crop Advisory Portal</h2>
            <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-2xl text-red-200 text-xs font-mono overflow-x-auto">
              <strong className="block text-red-400 font-bold mb-1">Runtime Exception:</strong>
              {this.state.error && this.state.error.toString()}
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="w-full py-3 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 transition text-center"
            >
              Reset & Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

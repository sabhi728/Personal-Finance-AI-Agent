import { useState } from 'react'
import './App.css'

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

interface FinancialPlan {
  openai_api_key: string;
  serp_api_key: string;
  financial_goals: string;
  current_situation: string;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [plan, setPlan] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FinancialPlan>({
    openai_api_key: '',
    serp_api_key: '',
    financial_goals: '',
    current_situation: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }

      const data = await response.json();
      setPlan(data.plan);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate financial plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Personal Finance Manager</h1>
      </header>
      
      <main className="main-content">
        <div className="balance-card">
          <h2>Current Balance</h2>
          <p className="balance-amount">${balance.toFixed(2)}</p>
        </div>

        <div className="financial-planning-section">
          <h2>Generate Financial Plan</h2>
          <form onSubmit={handleSubmit} className="financial-form">
            <div className="form-group">
              <label htmlFor="openai_api_key">OpenAI API Key</label>
              <input
                type="password"
                id="openai_api_key"
                name="openai_api_key"
                value={formData.openai_api_key}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="serp_api_key">SerpAPI Key</label>
              <input
                type="password"
                id="serp_api_key"
                name="serp_api_key"
                value={formData.serp_api_key}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="financial_goals">Financial Goals</label>
              <input
                type="text"
                id="financial_goals"
                name="financial_goals"
                value={formData.financial_goals}
                onChange={handleInputChange}
                required
                placeholder="e.g., Save for retirement, buy a house"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="current_situation">Current Financial Situation</label>
              <textarea
                id="current_situation"
                name="current_situation"
                value={formData.current_situation}
                onChange={handleInputChange}
                required
                placeholder="Describe your current income, expenses, savings, and investments"
              />
            </div>
            
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Generating Plan...' : 'Generate Financial Plan'}
            </button>
          </form>

          {plan && (
            <div className="plan-result">
              <h3>Your Financial Plan</h3>
              <div className="plan-content">
                {plan.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="transactions-section">
          <h2>Recent Transactions</h2>
          <div className="transactions-list">
            {transactions.length === 0 ? (
              <p>No transactions yet</p>
            ) : (
              transactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <span className="transaction-description">{transaction.description}</span>
                    <span className="transaction-date">{transaction.date}</span>
                  </div>
                  <span className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

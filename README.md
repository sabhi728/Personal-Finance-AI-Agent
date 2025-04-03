# 💰 AI Personal Finance Planner

A modern, AI-powered personal finance management application that combines the power of OpenAI GPT-4 with an intuitive React-based user interface. This application helps you take control of your financial future by providing personalized financial planning and real-time transaction tracking.

## 🚀 Features

### Interactive UI Features
- **Real-time Balance Tracking**: View your current financial balance at a glance
- **Transaction Management**: Track and categorize your income and expenses
- **Modern Dashboard**: Clean, intuitive interface with responsive design
- **Secure API Key Management**: Safely store and manage your API keys
- **Real-time Updates**: Instant feedback on your financial activities

### AI-Powered Financial Planning
- **Personalized Financial Plans**: Generate customized financial strategies using GPT-4
- **Goal Setting**: Define and track your financial objectives
- **Situation Analysis**: Get AI-powered insights into your current financial status
- **Investment Recommendations**: Receive tailored investment advice
- **Budget Planning**: Create and manage personalized budgets

## 🛠️ Technology Stack

### Frontend Technologies
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: CSS3 with modern features
- **Type Checking**: TypeScript
- **Package Manager**: npm
- **Development Tools**:
  - ESLint for code linting
  - Prettier for code formatting
  - TypeScript for type safety

### Backend Technologies
- **Framework**: FastAPI
- **Language**: Python 3.8+
- **AI Integration**: OpenAI GPT-4 API
- **Search Integration**: SerpAPI
- **API Documentation**: OpenAPI/Swagger
- **Package Manager**: pip

## 📋 Prerequisites

### Frontend Requirements
- Node.js (v14 or higher)
- npm (v6 or higher)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Backend Requirements
- Python (v3.8 or higher)
- pip (Python package manager)
- OpenAI API Key
- SerpAPI Key

## 🚀 Installation Guide

### Frontend Setup

1. **Install Node.js and npm**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Clone the Repository**
   ```bash
   git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
   cd awesome-llm-apps/ai_agent_tutorials/ai_personal_finance_agent
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```
   This will install all required dependencies including:
   - React
   - TypeScript
   - Vite
   - Development tools and linters

4. **Configure Environment Variables**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Backend Setup

1. **Install Python Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Set Up API Keys**
   - Sign up for an [OpenAI account](https://platform.openai.com/) and obtain your API key
   - Sign up for a [SerpAPI account](https://serpapi.com/) and obtain your API key

3. **Start the Backend Server**
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`

## 🎯 Usage

1. **Dashboard Overview**
   - View your current balance
   - Track recent transactions
   - Monitor financial goals

2. **Financial Planning**
   - Enter your financial goals
   - Describe your current situation
   - Generate personalized plans
   - Review and implement recommendations

3. **Transaction Management**
   - Add new transactions
   - Categorize income and expenses
   - Track spending patterns
   - Monitor financial progress

## 🔒 Security

- API keys are stored securely and never exposed in the frontend
- All sensitive data is handled with encryption
- Secure communication between frontend and backend

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
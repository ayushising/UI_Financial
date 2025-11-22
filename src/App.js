import './App.css';
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import CreateCaseForm from './CreateCaseForm';
import Header from './Header';


export default function App() {
  // State to manage the current page. 'dashboard' is the default.
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Function to change the page, passed to child components
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Render the correct page based on the 'currentPage' state
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={navigateTo} />;
      case 'createCase':
        return <CreateCaseForm onNavigate={navigateTo} />;
      default:
        return <Dashboard onNavigate={navigateTo} />;
    }
  };

  return (
    // The gray background for the whole app
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}


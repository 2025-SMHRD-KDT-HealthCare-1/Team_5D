import React, { useState } from 'react';
import Layout, { GuardianTab } from './components/Layout';
import Home from './components/Home';
import Report from './components/Report';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import Login from './components/Login';
import Signup from './components/Signup';
import FindAccount from './components/FindAccount';
import { targets } from './data/mock';

export default function App() {
  const [activeTab, setActiveTab] = useState<GuardianTab>('home');
  const [selectedPerson, setSelectedPerson] = useState(targets[0]?.name ?? '대상자');
  const [view, setView] = useState<'login' | 'signup' | 'find' | 'app'>('login');
  const [findMode, setFindMode] = useState<'id' | 'pw'>('id');

  const handleLogin = () => {
    setView('app');
    setActiveTab('home');
  };

  const handleGoSignup = () => {
    setView('signup');
  };

  const handleGoFindId = () => {
    setFindMode('id');
    setView('find');
  };

  const handleGoFindPw = () => {
    setFindMode('pw');
    setView('find');
  };

  const handleBackToLogin = () => {
    setView('login');
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'report':
        return <Report />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  if (view === 'login') {
    return (
      <Login
        onLogin={handleLogin}
        onGoSignup={handleGoSignup}
        onGoFindId={handleGoFindId}
        onGoFindPw={handleGoFindPw}
      />
    );
  }

  if (view === 'signup') {
    return <Signup onBack={handleBackToLogin} />;
  }

  if (view === 'find') {
    return <FindAccount onBack={handleBackToLogin} initialMode={findMode} />;
  }

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      selectedPerson={selectedPerson}
      setSelectedPerson={setSelectedPerson}
    >
      {renderTab()}
    </Layout>
  );
}

import React, { useState } from 'react';
import Layout, { GuardianTab } from './components/Layout';
import Home from './components/Home';
import Report from './components/Report';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import { targets } from './data/mock';

export default function App() {
  const [activeTab, setActiveTab] = useState<GuardianTab>('home');
  const [selectedPerson, setSelectedPerson] = useState(targets[0]?.name ?? '대상자');
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

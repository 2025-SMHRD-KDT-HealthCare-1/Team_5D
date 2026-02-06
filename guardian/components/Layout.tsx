import React from 'react';
import { Home, FileText, Bell, Settings } from 'lucide-react';
import logoImg from './logo.png';

export type GuardianTab = 'home' | 'report' | 'notifications' | 'settings';

interface LayoutProps {
  activeTab: GuardianTab;
  setActiveTab: (tab: GuardianTab) => void;
  selectedPerson: string;
  setSelectedPerson: (person: string) => void;
  children: React.ReactNode;
}

export default function Layout({ activeTab, setActiveTab, children }: LayoutProps) {
  const currentUser = { name: "영서" };

  const handleLogout = () => {
    console.log("로그아웃 처리됨");
    alert("로그아웃 되었습니다.");
  };

  const tabs = [
    { id: 'home' as const, label: '홈', icon: Home },
    { id: 'report' as const, label: '리포트', icon: FileText },
    { id: 'notifications' as const, label: '알림', icon: Bell },
    { id: 'settings' as const, label: '설정', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={logoImg} 
              alt="SOIN" 
              className="h-10 w-auto object-contain" 
            />
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <span className="font-bold text-gray-900">{currentUser.name}님</span>
            <button 
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              (로그아웃)
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-10">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors min-w-[72px] ${
                  isActive
                    ? 'text-green-700 bg-green-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-green-700' : 'text-gray-500'}`} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
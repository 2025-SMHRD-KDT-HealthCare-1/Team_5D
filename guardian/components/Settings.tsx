import React, { useState } from 'react';
import { Bell, Users, AlertTriangle, User, LogOut, ChevronRight, UserPlus } from 'lucide-react';

export default function Settings() {
  const [notificationSettings, setNotificationSettings] = useState({
    nightMode: false,
  });

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const settingSections = [
    {
      title: '알림 설정',
      icon: Bell,
      items: [
        {
          label: '야간 알림',
          key: 'nightMode' as const,
          description: '밤 10시 ~ 오전 7시 알림 일시 중지',
        },
      ],
    },
  ];

  const menuSections = [
    {
      title: '가족 및 공유',
      icon: Users,
      items: [
        { label: '가족 초대', icon: UserPlus, action: () => alert('가족 초대 기능') },
        { label: '공유 권한 설정', icon: Users, action: () => alert('권한 설정') },
      ],
    },
    {
      title: '대상자 정보',
      icon: User,
      items: [
        { label: '대상자 정보 수정', icon: User, action: () => alert('정보 수정') },
      ],
    },
  ];

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">설정</h2>
      </div>

      {settingSections.map((section) => {
        const SectionIcon = section.icon;
        return (
          <section key={section.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <SectionIcon className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-gray-900">{section.title}</h3>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {section.items.map((item) => (
                <div key={item.key} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-base mb-1">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      className={`relative w-14 h-8 rounded-full transition-colors flex-shrink-0 ml-4 ${
                        notificationSettings[item.key] ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                          notificationSettings[item.key] ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {menuSections.map((section) => {
        const SectionIcon = section.icon;
        return (
          <section key={section.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <SectionIcon className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-gray-900">{section.title}</h3>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {section.items.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ItemIcon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900 text-base">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => alert('오류 신고 기능')}
          className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-200"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900 text-base">오류 신고</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => alert('로그아웃')}
          className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-200"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900 text-base">로그아웃</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => {
            if (confirm('정말 회원 탈퇴하시겠습니까?')) {
              alert('회원 탈퇴 처리');
            }
          }}
          className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-red-600 text-base">회원 탈퇴</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </section>

      <div className="text-center text-sm text-gray-500 pt-4">
        안심케어 v1.0.0
      </div>
    </div>
  );
}

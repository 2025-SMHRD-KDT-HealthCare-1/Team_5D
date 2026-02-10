import React, { useState } from 'react';
import AuthLayout from './AuthLayout';

interface FindAccountProps {
  onBack: () => void;
  initialMode?: FindMode;
}

type FindMode = 'id' | 'pw';

export default function FindAccount({ onBack, initialMode = 'id' }: FindAccountProps) {
  const [mode, setMode] = useState<FindMode>(initialMode);
  const mainColor = "#189877"; // 요청하신 브랜드 컬러

  return (
    <AuthLayout title="아이디/비밀번호 찾기" subtitle="가입 시 등록한 정보를 입력해 주세요.">
      <div className="w-full">
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setMode('id')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'id' 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            style={mode === 'id' ? { color: mainColor } : {}}
          >
            아이디 찾기
          </button>
          <button
            onClick={() => setMode('pw')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'pw' 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            style={mode === 'pw' ? { color: mainColor } : {}}
          >
            비밀번호 찾기
          </button>
        </div>

        <div className="space-y-4">
          {mode === 'pw' && (
            <input
              type="text"
              placeholder="아이디"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#189877]"
            />
          )}
          <input
            type="text"
            placeholder={mode === 'id' ? "이름" : "이름"}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#189877]"
          />
          <input
            type="email"
            placeholder="이메일"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#189877]"
          />
        </div>

        <button
          className="w-full text-white font-bold py-4 rounded-xl mt-8 cursor-pointer transition-opacity hover:opacity-90"
          style={{ backgroundColor: mainColor }}
        >
          {mode === 'id' ? '아이디 찾기' : '비밀번호 찾기'}
        </button>

        <div className="mt-6 text-center space-y-2">
          <button className="text-[12px] text-gray-400">
            가입하신 정보가 기억나지 않으시나요? <span className="text-blue-400 hover:underline cursor-pointer">고객센터 문의</span>
          </button>
          <div className="pt-2">
            <button 
              onClick={onBack}
              className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer underline"
            >
              로그인 화면으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

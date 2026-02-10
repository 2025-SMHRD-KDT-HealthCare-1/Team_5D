import React, { useState } from 'react';
import AuthLayout from './AuthLayout';

interface LoginProps {
  onLogin: () => void;
  onGoSignup: () => void;
  onGoFindId: () => void;
  onGoFindPw: () => void;
}

export default function Login({ onLogin, onGoSignup, onGoFindId, onGoFindPw }: LoginProps) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현 시에는 여기서 인증 로직을 처리합니다.
    onLogin();
  };

  return (
    <AuthLayout title="로그인" subtitle="사용자 정보를 입력해 주세요.">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="PW"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          style={{ backgroundColor: '#189877', minHeight: '52px' }}
          className="w-full text-white font-bold py-3 rounded-xl transition-all cursor-pointer mt-2 hover:opacity-90 active:scale-95"
        >
          로그인
        </button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-3 text-sm text-gray-400">
        <button
          type="button"
          onClick={onGoFindId}
          className="hover:text-gray-700 cursor-pointer"
        >
          아이디 찾기
        </button>
        <span className="text-gray-300">/</span>
        <button
          type="button"
          onClick={onGoFindPw}
          className="hover:text-gray-700 cursor-pointer"
        >
          비밀번호 찾기
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onGoSignup}
          className="text-sm text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          계정이 없으신가요?
        </button>
      </div>
    </AuthLayout>
  );
}

import React, { useState } from 'react';
import AuthLayout from './AuthLayout';

interface SignupProps {
  onBack: () => void; // 로그인 페이지로 돌아가는 함수
}

export default function Signup({ onBack }: SignupProps) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    password: '',
    passwordConfirm: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('회원가입 데이터:', formData);
    alert('회원가입이 완료되었습니다.');
    onBack();
  };

  return (
    <AuthLayout title="계정 생성" subtitle="사용자 정보를 입력해 주세요.">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            name="id"
            placeholder="ID"
            className="flex-1 h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          />
          <button 
            type="button"
            style={{ backgroundColor: '#000000', minWidth: '80px' }}
            className="text-white text-sm font-bold px-4 h-12 rounded-xl cursor-pointer hover:opacity-90 shrink-0"
          >
            중복확인
          </button>
        </div>

        <input
          type="text"
          name="name"
          placeholder="이름"
          className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
        />

        <input
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="email"
          className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
        />

        <button
          type="submit"
          style={{ backgroundColor: '#189877', minHeight: '52px' }}
          className="w-full text-white font-bold text-base tracking-wide py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center mt-4 hover:opacity-90 active:scale-95 shadow-md"
        >
          회원가입
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-[11px] text-gray-400 leading-relaxed px-4">
          ‘회원가입’을 클릭함으로써, <span className="font-bold underline cursor-pointer">이용약관</span> 및 <br />
          <span className="font-bold underline cursor-pointer">개인정보 처리방침</span>에 동의하는 것으로 간주됩니다
        </p>
        <button 
          onClick={onBack}
          className="mt-6 text-sm text-gray-500 hover:underline cursor-pointer"
        >
          이미 계정이 있으신가요? 로그인하기
        </button>
      </div>
    </AuthLayout>
  );
}

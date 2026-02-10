import React from 'react';
import logoImg from './logo.png';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-10">
      <div className="mx-auto w-full max-w-[420px]">
          <div className="flex flex-col items-center text-center">
            <img
              src={logoImg}
              alt="SOIN"
              className="w-24 sm:w-28 md:w-32 h-auto object-contain"
            />
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

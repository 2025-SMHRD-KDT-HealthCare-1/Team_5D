import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, Clock, Home } from 'lucide-react';
import { activityByDay, activityByHour, dailySummaryStats } from '../data/mock';

const statIconMap = {
  activity: Activity,
  inactive: Clock,
  outings: Home,
} as const;

const statColorMap = {
  activity: 'text-green-600',
  inactive: 'text-yellow-600',
  outings: 'text-blue-600',
} as const;

export default function Report() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly'>('daily');

  const todayStats = dailySummaryStats.map((stat) => ({
    ...stat,
    icon: statIconMap[stat.iconKey],
    color: statColorMap[stat.iconKey],
  }));

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setSelectedPeriod('daily')}
          className={`flex-1 py-3 rounded-lg font-semibold text-base transition-colors ${
            selectedPeriod === 'daily'
              ? 'bg-white text-green-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          일일
        </button>
        <button
          onClick={() => setSelectedPeriod('weekly')}
          className={`flex-1 py-3 rounded-lg font-semibold text-base transition-colors ${
            selectedPeriod === 'weekly'
              ? 'bg-white text-green-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          주간
        </button>
      </div>

      {selectedPeriod === 'daily' && (
        <section className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">오늘의 활동</h2>
          <div className="grid grid-cols-3 gap-3">
            {todayStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-gray-50 rounded-lg p-4 text-center">
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {selectedPeriod === 'daily' && (
        <section className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">시간대별 활동량</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityByHour}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="hour" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                <Bar dataKey="activity" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            활동량이 높은 시간대: 오전 9시
          </p>
        </section>
      )}

      {selectedPeriod === 'weekly' && (
        <section className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">주간 활동 추이</h2>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-semibold">평균 대비 +8%</span>
            </div>
          </div>
          
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="activity" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-yellow-900 mb-1">이상 징후 감지</p>
            <p className="text-sm text-yellow-700">
              수요일 활동량이 평균 대비 25% 감소했습니다
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const PERIODS = ['일', '주', '월'] as const;

type Period = typeof PERIODS[number];

const TIME_DATA_BY_PERIOD: Record<Period, { time: string; events: number }[]> = {
  일: [
    { time: '00시', events: 2 },
    { time: '04시', events: 1 },
    { time: '08시', events: 12 },
    { time: '12시', events: 8 },
    { time: '16시', events: 15 },
    { time: '20시', events: 20 },
    { time: '23시', events: 5 },
  ],
  주: [
    { time: '월', events: 45 },
    { time: '화', events: 32 },
    { time: '수', events: 54 },
    { time: '목', events: 40 },
    { time: '금', events: 72 },
    { time: '토', events: 60 },
    { time: '일', events: 33 },
  ],
  월: [
    { time: '1주', events: 210 },
    { time: '2주', events: 180 },
    { time: '3주', events: 240 },
    { time: '4주', events: 195 },
  ],
};

const TYPE_DATA_BY_PERIOD: Record<Period, { name: string; value: number }[]> = {
  일: [
    { name: '낙상', value: 15 },
    { name: '배회', value: 30 },
    { name: '무활동', value: 55 },
  ],
  주: [
    { name: '낙상', value: 82 },
    { name: '배회', value: 140 },
    { name: '무활동', value: 220 },
  ],
  월: [
    { name: '낙상', value: 320 },
    { name: '배회', value: 540 },
    { name: '무활동', value: 780 },
  ],
};

const TREND_DATA_BY_PERIOD: Record<Period, { label: string; fall: number; wander: number; inactivity: number }[]> = {
  일: [
    { label: '06시', fall: 1, wander: 2, inactivity: 4 },
    { label: '12시', fall: 3, wander: 4, inactivity: 6 },
    { label: '18시', fall: 4, wander: 5, inactivity: 8 },
    { label: '24시', fall: 2, wander: 3, inactivity: 5 },
  ],
  주: [
    { label: '월', fall: 8, wander: 15, inactivity: 20 },
    { label: '화', fall: 10, wander: 12, inactivity: 18 },
    { label: '수', fall: 12, wander: 20, inactivity: 22 },
    { label: '목', fall: 7, wander: 18, inactivity: 16 },
    { label: '금', fall: 14, wander: 22, inactivity: 25 },
    { label: '토', fall: 11, wander: 20, inactivity: 21 },
    { label: '일', fall: 9, wander: 16, inactivity: 19 },
  ],
  월: [
    { label: '1주', fall: 40, wander: 60, inactivity: 90 },
    { label: '2주', fall: 38, wander: 70, inactivity: 85 },
    { label: '3주', fall: 52, wander: 80, inactivity: 95 },
    { label: '4주', fall: 45, wander: 75, inactivity: 88 },
  ],
};

const ERROR_DATA = [
  { name: '네트워크', value: 12 },
  { name: '카메라', value: 5 },
  { name: '전원', value: 2 },
  { name: '기타', value: 3 },
];

const TARGET_STATS = [
  { id: 'TGT-1023', name: '김철수', total: 18, highRisk: 4, devices: 2 },
  { id: 'TGT-2041', name: '이영희', total: 12, highRisk: 2, devices: 1 },
  { id: 'TGT-3321', name: '박민수', total: 6, highRisk: 1, devices: 1 },
];

const COLORS = ['#ef4444', '#f97316', '#3b82f6'];

export const Statistics: React.FC = () => {
  const [period, setPeriod] = useState<Period>('일');

  const timeData = useMemo(() => TIME_DATA_BY_PERIOD[period], [period]);
  const typeData = useMemo(() => TYPE_DATA_BY_PERIOD[period], [period]);
  const trendData = useMemo(() => TREND_DATA_BY_PERIOD[period], [period]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {PERIODS.map((option) => (
          <button
            key={option}
            onClick={() => setPeriod(option)}
            className={`px-4 py-2 text-sm rounded-lg border ${
              period === option ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            {option} 기준
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-w-0">
          <h3 className="text-lg font-bold text-gray-800 mb-6">시간대별 이벤트 발생 분포</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f3f4f6' }}
                />
                <Bar dataKey="events" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-w-0">
          <h3 className="text-lg font-bold text-gray-800 mb-6">이벤트 유형별 비율</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={typeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 col-span-1 lg:col-span-2 min-w-0">
          <h3 className="text-lg font-bold text-gray-800 mb-6">이벤트 유형별 추이 분석</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f3f4f6' }}
                />
                <Legend />
                <Line type="monotone" dataKey="fall" name="낙상" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="wander" name="배회" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="inactivity" name="무활동" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 col-span-1 lg:col-span-2 min-w-0">
          <h3 className="text-lg font-bold text-gray-800 mb-6">장치 오류 유형 분석</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {ERROR_DATA.map((err, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-gray-500 font-medium mb-2">{err.name}</span>
                <span className="text-2xl font-bold text-gray-800">{err.value}건</span>
                <div className="w-full h-1 bg-gray-200 mt-3 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400" style={{ width: `${(err.value / 20) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 col-span-1 lg:col-span-2 min-w-0">
          <h3 className="text-lg font-bold text-gray-800 mb-6">대상자별 통계</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TARGET_STATS.map((target) => (
              <div key={target.id} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-500">{target.name}</p>
                <p className="text-xs text-gray-400">{target.id}</p>
                <div className="mt-3 space-y-1 text-sm text-gray-700">
                  <div>전체 이벤트: {target.total}건</div>
                  <div>고위험: {target.highRisk}건</div>
                  <div>연결 장치: {target.devices}대</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

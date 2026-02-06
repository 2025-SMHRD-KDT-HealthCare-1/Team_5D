import React from 'react';
import { ArrowRight, Shield, CheckCircle, AlertTriangle, AlertCircle, Wifi, WifiOff, Thermometer, Droplets } from 'lucide-react';
import { NotificationItem } from './Notifications';
import {
  alerts,
  devices,
  environmentMetrics,
  formatRelativeTime,
  riskLevelToSeverity,
  targetStatuses,
  targets,
  alertTypeLabelMap,
  alertTypeToNotificationType,
  targetStatusToUiStatus,
  deviceStatusToUiStatus,
} from '../data/mock';

interface StatusCardProps {
  status: 'normal' | 'warning' | 'danger';
  lastUpdate: string;
  deviceStatus: 'online' | 'offline';
}

function StatusCard({ status, lastUpdate, deviceStatus }: StatusCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'normal':
        return {
          icon: CheckCircle,
          text: '정상',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          iconColor: 'text-green-600',
          borderColor: 'border-green-200',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          text: '주의 필요',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700',
          iconColor: 'text-yellow-600',
          borderColor: 'border-yellow-200',
        };
      case 'danger':
        return {
          icon: AlertCircle,
          text: '위험',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          iconColor: 'text-red-600',
          borderColor: 'border-red-200',
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className={`rounded-xl border-2 ${statusConfig.borderColor} ${statusConfig.bgColor} p-3`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="rounded-full p-2 bg-white shrink-0">
          <StatusIcon className={`w-8 h-8 ${statusConfig.iconColor}`} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] text-gray-600 leading-none mb-1">현재 상태</p>
          <p className={`text-lg font-bold leading-none truncate ${statusConfig.textColor}`}>
            {statusConfig.text}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200 gap-1">
        <div className="flex items-center min-w-0">
          <span className="text-[9px] text-gray-500 whitespace-nowrap shrink-0">업데이트:</span>
          <span className="text-[9px] font-bold text-gray-900 truncate ml-0.5">{lastUpdate}</span>
        </div>
        
        <div className="flex items-center shrink-0">
          {deviceStatus === 'online' ? (
            <div className="flex items-center gap-0.5">
              <Wifi className="w-3 h-3 text-green-600" />
              <span className="text-[9px] font-bold text-green-700 whitespace-nowrap">정상</span>
            </div>
          ) : (
            <div className="flex items-center gap-0.5">
              <WifiOff className="w-3 h-3 text-red-600" />
              <span className="text-[9px] font-bold text-red-700 whitespace-nowrap">오류</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TemperatureCardProps {
  temperature: number;
  humidity: number;
}

function TemperatureCard({ temperature, humidity }: TemperatureCardProps) {
  return (
    <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="rounded-full p-2 bg-white shrink-0">
          <Thermometer className="w-8 h-8 text-blue-600" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] text-gray-600 leading-none mb-1">실내 온도</p>
          <p className="text-lg font-bold leading-none text-blue-700 truncate">
            {temperature}°C
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200 gap-1">
        <div className="flex items-center min-w-0">
          <span className="text-[9px] text-gray-500 whitespace-nowrap shrink-0">습도:</span>
          <span className="text-[9px] font-bold text-gray-900 ml-0.5">{humidity}%</span>
        </div>
        
        <div className="flex items-center gap-0.5 shrink-0">
          <Droplets className="w-3 h-3 text-blue-600" />
          <span className="text-[9px] font-bold text-blue-700 whitespace-nowrap">쾌적</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const primaryTarget = targets[0];
  const targetStatus = targetStatuses.find((status) => status.targetId === primaryTarget?.targetId);
  const device = devices.find((item) => item.targetId === primaryTarget?.targetId);

  const currentStatus = targetStatus ? targetStatusToUiStatus[targetStatus.currentStatus] : 'normal';
  const lastUpdate = targetStatus ? formatRelativeTime(targetStatus.lastActivityAt) : '없음';
  const deviceStatus = device ? deviceStatusToUiStatus[device.status] : 'offline';
  const temperature = environmentMetrics.temperature;
  const humidity = environmentMetrics.humidity;

  const recentNotifications = alerts
    .filter((alert) => !primaryTarget || alert.targetId === primaryTarget.targetId)
    .slice(0, 2)
    .map((alert) => ({
      id: alert.alertId,
      type: alertTypeToNotificationType[alert.alertType],
      title: alertTypeLabelMap[alert.alertType],
      time: formatRelativeTime(alert.detectedAt),
      severity: riskLevelToSeverity[alert.riskLevel],
      read: alert.isRead,
    }));

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-2">
        <StatusCard 
          status={currentStatus}
          lastUpdate={lastUpdate}
          deviceStatus={deviceStatus}
        />
        <TemperatureCard 
          temperature={temperature}
          humidity={humidity}
        />
      </div>

      <section className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">최근 알림</h2>
          <button className="text-green-700 font-semibold text-sm flex items-center gap-1 hover:text-green-800">
            전체보기
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {recentNotifications.length > 0 ? (
            recentNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} compact />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8 text-sm">알림이 없습니다</p>
          )}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-2">실시간 모니터링</h2>
          <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
            <Shield className="w-4 h-4" />
            <span className="font-medium">원본 영상은 저장되지 않습니다</span>
          </div>
        </div>

        <div className="relative bg-gray-100 aspect-video flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
          <div className="relative z-10 text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-400 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-2.5 w-24 bg-gray-400 rounded mx-auto animate-pulse"></div>
              <div className="h-2.5 w-16 bg-gray-400 rounded mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-gray-50 text-center">
          <p className="text-[11px] text-gray-600">
            비식별화 처리된 영상이 제공됩니다
          </p>
        </div>
      </section>
    </div>
  );
}
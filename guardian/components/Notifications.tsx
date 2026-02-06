import React, { useState } from 'react';
import { AlertCircle, Activity, MapPin, Phone, Shield, X } from 'lucide-react';
import {
  alerts,
  formatRelativeTime,
  formatTimestamp,
  riskLevelToSeverity,
  targets,
  alertTypeLabelMap,
  alertTypeToNotificationType,
} from '../data/mock';

interface NotificationItemProps {
  notification: {
    id: string;
    type: 'fall' | 'activity' | 'movement';
    title: string;
    time: string;
    severity: 'info' | 'warning' | 'danger';
    read: boolean;
  };
  compact?: boolean;
}

export function NotificationItem({ notification, compact = false }: NotificationItemProps) {
  const getTypeIcon = () => {
    switch (notification.type) {
      case 'fall':
        return AlertCircle;
      case 'activity':
        return Activity;
      case 'movement':
        return MapPin;
    }
  };

  const getSeverityColor = () => {
    switch (notification.severity) {
      case 'info':
        return 'bg-blue-100 text-blue-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'danger':
        return 'bg-red-100 text-red-700';
    }
  };

  const Icon = getTypeIcon();

  return (
    <button
      className={`w-full text-left ${
        compact ? 'p-3' : 'p-4'
      } bg-white border rounded-lg hover:bg-gray-50 transition-colors ${
        notification.read ? 'border-gray-200' : 'border-green-300 bg-green-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`rounded-full p-2 ${getSeverityColor()} flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-gray-900 mb-1 ${compact ? 'text-base' : 'text-lg'}`}>
            {notification.title}
          </p>
          <p className="text-sm text-gray-500">{notification.time}</p>
        </div>

        {!notification.read && (
          <div className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0 mt-2"></div>
        )}
      </div>
    </button>
  );
}

export default function Notifications() {
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);

  const primaryTarget = targets[0];
  const notifications = alerts
    .filter((alert) => !primaryTarget || alert.targetId === primaryTarget.targetId)
    .map((alert) => ({
      id: alert.alertId,
      type: alertTypeToNotificationType[alert.alertType],
      title: alertTypeLabelMap[alert.alertType],
      time: formatRelativeTime(alert.detectedAt),
      severity: riskLevelToSeverity[alert.riskLevel],
      read: alert.isRead,
      details: {
        timestamp: formatTimestamp(alert.detectedAt),
        location: alert.location,
        description: alert.description,
      },
    }));

  const selectedData = notifications.find((notification) => notification.id === selectedNotification);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'danger':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">위험</span>;
      case 'warning':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">주의</span>;
      case 'info':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">정보</span>;
    }
  };

  if (selectedNotification && selectedData) {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-4 sticky top-0">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <button
              onClick={() => setSelectedNotification(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-lg font-bold text-gray-900">알림 상세</h2>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="p-4 max-w-md mx-auto space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedData.title}</h3>
              {getSeverityBadge(selectedData.severity)}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-base">
                <span className="text-gray-500 w-20">발생 시각</span>
                <span className="font-semibold text-gray-900">{selectedData.details.timestamp}</span>
              </div>
              <div className="flex items-center gap-3 text-base">
                <span className="text-gray-500 w-20">위치</span>
                <span className="font-semibold text-gray-900">{selectedData.details.location}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-base text-gray-700">{selectedData.details.description}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                <Shield className="w-5 h-5" />
                <span className="font-medium">비식별화 처리된 이미지입니다</span>
              </div>
            </div>

            <div className="relative bg-gray-100 aspect-video flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"></div>
              <div className="relative z-10 text-center p-6">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-400"></div>
                <div className="space-y-2">
                  <div className="h-2 w-24 bg-gray-400 rounded mx-auto"></div>
                  <div className="h-2 w-16 bg-gray-400 rounded mx-auto"></div>
                </div>
              </div>
            </div>
          </div>

          {selectedData.severity === 'danger' && (
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-lg">
              <Phone className="w-6 h-6" />
              긴급 연락하기
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">알림</h2>
        <p className="text-base text-gray-500 mt-1">
          미확인 알림 {notifications.filter((notification) => !notification.read).length}개
        </p>
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <div key={notification.id} onClick={() => setSelectedNotification(notification.id)}>
            <NotificationItem notification={notification} />
          </div>
        ))}
      </div>
    </div>
  );
}

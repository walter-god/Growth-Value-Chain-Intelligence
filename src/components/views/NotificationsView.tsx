import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  Clock, 
  Radio, 
  CreditCard, 
  Layers, 
  Sliders, 
  ChevronRight,
  ShieldCheck,
  CheckCheck
} from 'lucide-react';
import { Article, NotificationItem } from '../../types';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  articles: Article[];
  onMarkAllRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  articles,
  onMarkAllRead,
  onSelectNotification,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'unread' | 'breaking_wire' | 'billing'>('all');

  const filteredNotifications = notifications.filter(n => {
    if (filterTab === 'unread') return !n.read;
    if (filterTab === 'breaking_wire') return n.type === 'breaking_wire';
    if (filterTab === 'billing') return n.type === 'billing';
    return true;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'breaking_wire':
        return <Radio className="w-4 h-4 text-[#C5A059]" />;
      case 'billing':
        return <CreditCard className="w-4 h-4 text-amber-400" />;
      case 'followed_beat':
        return <Bell className="w-4 h-4 text-[#C5A059]" />;
      default:
        return <Layers className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div id="notifications-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-[#D1D5DB]">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#1F232E] pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C5A059]">
            <Bell className="w-4 h-4" />
            <span>EXECUTIVE DISPATCH CENTER</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight mt-1">
            Real-Time Notifications
          </h1>
        </div>

        <button
          onClick={onMarkAllRead}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white bg-[#0F1115] border border-[#232733] px-3 py-1.5 rounded-lg shadow-2xs transition hover:bg-[#14171F]"
        >
          <CheckCheck className="w-3.5 h-3.5 text-[#C5A059]" /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 text-xs">
        {[
          { label: 'All Dispatches', value: 'all' },
          { label: 'Unread Only', value: 'unread' },
          { label: 'Wire Breaking Alerts', value: 'breaking_wire' },
          { label: 'Account & Billing', value: 'billing' },
        ].map(t => (
          <button
            key={t.value}
            onClick={() => setFilterTab(t.value as any)}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${filterTab === t.value ? 'bg-[#C5A059] text-[#0A0B0D] font-bold' : 'bg-[#14171F] text-gray-400 hover:text-white hover:bg-[#1F232E]'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Notification Items List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectNotification(item)}
              className={`p-4 rounded-xl border transition cursor-pointer flex items-start justify-between gap-4 ${item.read ? 'bg-[#0F1115] border-[#232733] hover:border-[#343A4C]' : 'bg-[#0F1115] border-[#C5A059] shadow-md'}`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-[#14171F] rounded-lg border border-[#232733] shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      {item.title}
                    </span>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#C5A059] shrink-0"></span>
                    )}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-500 shrink-0 mt-2" />
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-[#0F1115] rounded-xl border border-[#232733] p-8 space-y-2">
            <Bell className="w-8 h-8 text-gray-600 mx-auto" />
            <div className="text-sm font-bold text-gray-300">No Notifications</div>
            <div className="text-xs text-gray-500">You are all caught up with your intelligence feed.</div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { BarChart3, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { Analytics } from '../types';

interface AnalyticsPanelProps {
  analytics: Analytics;
  onClose: () => void;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ analytics, onClose }) => {
  const [view, setView] = useState<'summary' | 'details'>('summary');

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto z-50 slide-in-right">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="text-blue-500" />
            Analytics
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {/* Stats Cards */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Total Tasks</p>
                <p className="text-3xl font-bold text-blue-600">{analytics.totalTasks}</p>
              </div>
              <TrendingUp className="text-blue-400" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Completed</p>
                <p className="text-3xl font-bold text-green-600">{analytics.completedTasks}</p>
              </div>
              <CheckCircle2 className="text-green-400" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Pending</p>
                <p className="text-3xl font-bold text-orange-600">{analytics.pendingTasks}</p>
              </div>
              <Clock className="text-orange-400" size={32} />
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">Completion Rate</p>
            <div className="flex items-center justify-between">
              <div className="w-full mr-3">
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div
                    className="bg-purple-500 h-3 rounded-full transition-all"
                    style={{ width: `${analytics.completionRate}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-lg font-bold text-purple-600">{analytics.completionRate.toFixed(0)}%</p>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setView('summary')}
            className={`flex-1 py-2 rounded font-semibold transition-colors ${
              view === 'summary'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setView('details')}
            className={`flex-1 py-2 rounded font-semibold transition-colors ${
              view === 'details'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Details
          </button>
        </div>

        {/* Content */}
        {view === 'summary' ? (
          <div className="space-y-4">
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Today's Tasks:</span>
                  <span className="font-semibold">{Object.keys(analytics.widgetsByDate).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Per Day:</span>
                  <span className="font-semibold">
                    {Object.keys(analytics.widgetsByDate).length > 0
                      ? (analytics.totalTasks / Object.keys(analytics.widgetsByDate).length).toFixed(1)
                      : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Widgets by Date */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-3">Widgets by Date</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {Object.entries(analytics.widgetsByDate).map(([date, count]) => (
                  <div key={date} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{date}</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Widgets by Color */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-3">Widgets by Color</h3>
              <div className="space-y-2">
                {Object.entries(analytics.widgetsByColor).map(([color, count]) => (
                  <div key={color} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="flex-1 text-sm text-gray-600">{color}</span>
                    <span className="text-sm font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPanel;

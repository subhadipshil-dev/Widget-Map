import React, { useState, useEffect } from 'react';
import { Plus, BarChart3, Trash2, Menu, Moon, Sun } from 'lucide-react';
import { Widget, Analytics } from './types';
import { storageService } from './services/storageService';
import WidgetCard from './components/WidgetCard';
import CreateWidgetModal from './components/CreateWidgetModal';
import AnalyticsPanel from './components/AnalyticsPanel';
import './App.css';

const App: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load data on mount
  useEffect(() => {
    const savedWidgets = storageService.getWidgets();
    setWidgets(savedWidgets);
    setAnalytics(storageService.calculateAnalytics());
    
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('widget-dark-mode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Update analytics whenever widgets change
  useEffect(() => {
    setAnalytics(storageService.calculateAnalytics());
  }, [widgets]);

  const handleCreateWidget = (newWidget: Omit<Widget, 'id' | 'zIndex'>) => {
    const widget: Widget = {
      ...newWidget,
      id: `widget-${Date.now()}`,
      zIndex: widgets.length
    };
    const updatedWidgets = [...widgets, widget];
    setWidgets(updatedWidgets);
    storageService.addWidget(widget);
  };

  const handleUpdateWidget = (id: string, updates: Partial<Widget>) => {
    const updatedWidgets = widgets.map(w => w.id === id ? { ...w, ...updates } : w);
    setWidgets(updatedWidgets);
    storageService.updateWidget(id, updates);
  };

  const handleDeleteWidget = (id: string) => {
    const updatedWidgets = widgets.filter(w => w.id !== id);
    setWidgets(updatedWidgets);
    storageService.deleteWidget(id);
  };

  const handleWidgetDragStart = (e: React.DragEvent, id: string) => {
    setDraggedWidget(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedWidget) return;

    const canvas = e.currentTarget as HTMLElement;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    handleUpdateWidget(draggedWidget, { x, y });
    setDraggedWidget(null);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all widgets? This action cannot be undone.')) {
      setWidgets([]);
      storageService.clearAllData();
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('widget-dark-mode', String(newDarkMode));
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
      document.querySelector('.grid-canvas')?.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.querySelector('.grid-canvas')?.classList.remove('dark-mode');
    }
  };

  const sortedWidgets = [...widgets].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Widget Map</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
              <span className="text-sm font-semibold text-gray-700">
                Total: <span className="text-blue-600">{widgets.length}</span> |
              </span>
              <span className="text-sm font-semibold text-gray-700">
                Done: <span className="text-green-600">{widgets.filter(w => w.completed).length}</span>
              </span>
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun className="text-yellow-500" size={24} /> : <Moon className="text-gray-600" size={24} />}
            </button>

            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Show Analytics"
            >
              <BarChart3 className="text-blue-500" size={24} />
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
              title="Create new widget"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">New Widget</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-40 fade-in">
                  <button
                    onClick={() => {
                      handleClearAll();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-semibold flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    Clear All Data
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-full">
        {/* Canvas */}
        <div
          className="flex-1 grid-canvas relative overflow-auto"
          onDragOver={handleCanvasDragOver}
          onDrop={handleCanvasDrop}
        >
          {widgets.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">�</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">No widgets yet</h2>
                <p className="text-gray-600 mb-6">Create your first widget to get started!</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors fade-in"
                >
                  Create First Widget
                </button>
              </div>
            </div>
          ) : (
            sortedWidgets.map(widget => (
              <div
                key={widget.id}
                className="absolute w-48 fade-in"
                style={{
                  left: `${typeof widget.x === 'number' ? widget.x : 50}px`,
                  top: `${typeof widget.y === 'number' ? widget.y : 50}px`,
                  zIndex: widget.zIndex
                }}
              >
                <WidgetCard
                  widget={widget}
                  onUpdate={handleUpdateWidget}
                  onDelete={handleDeleteWidget}
                  onDragStart={handleWidgetDragStart}
                />
              </div>
            ))
          )}

          {/* Watermark */}
          <div
            className="fixed bottom-4 right-4 watermark text-xs text-gray-500 hover:text-blue-600"
            onClick={() => window.open('https://github.com/subhadipshil-dev', '_blank')}
            title="Visit GitHub Profile"
          >
            <p className="font-semibold">by @subhadipshil-dev</p>
          </div>
        </div>

        {/* Analytics Panel */}
        {showAnalytics && analytics && (
          <AnalyticsPanel
            analytics={analytics}
            onClose={() => setShowAnalytics(false)}
          />
        )}
      </div>

      {/* Create Widget Modal */}
      {showCreateModal && (
        <CreateWidgetModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateWidget}
        />
      )}
    </div>
  );
};

export default App;

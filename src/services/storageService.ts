import { Widget, Analytics } from './types';

const STORAGE_KEY = 'widget-notes-data';
const ANALYTICS_KEY = 'widget-notes-analytics';

export const storageService = {
  // Widget operations
  getWidgets: (): Widget[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading widgets:', error);
      return [];
    }
  },

  saveWidgets: (widgets: Widget[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
    } catch (error) {
      console.error('Error saving widgets:', error);
    }
  },

  addWidget: (widget: Widget): void => {
    const widgets = storageService.getWidgets();
    widgets.push(widget);
    storageService.saveWidgets(widgets);
  },

  updateWidget: (id: string, updates: Partial<Widget>): void => {
    const widgets = storageService.getWidgets();
    const index = widgets.findIndex(w => w.id === id);
    if (index !== -1) {
      widgets[index] = { ...widgets[index], ...updates };
      storageService.saveWidgets(widgets);
    }
  },

  deleteWidget: (id: string): void => {
    const widgets = storageService.getWidgets();
    const filtered = widgets.filter(w => w.id !== id);
    storageService.saveWidgets(filtered);
  },

  // Analytics operations
  calculateAnalytics: (): Analytics => {
    const widgets = storageService.getWidgets();
    const totalTasks = widgets.length;
    const completedTasks = widgets.filter(w => w.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    const widgetsByDate: Record<string, number> = {};
    const widgetsByColor: Record<string, number> = {};

    widgets.forEach(widget => {
      // Count by date
      widgetsByDate[widget.createdDate] = (widgetsByDate[widget.createdDate] || 0) + 1;

      // Count by color
      widgetsByColor[widget.color] = (widgetsByColor[widget.color] || 0) + 1;
    });

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      widgetsByDate,
      widgetsByColor
    };
  },

  getTodayWidgets: (): Widget[] => {
    const today = new Date().toISOString().split('T')[0];
    const widgets = storageService.getWidgets();
    return widgets.filter(w => w.createdDate === today);
  },

  clearAllData: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
};

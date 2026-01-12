export interface Widget {
  id: string;
  title: string;
  content: string;
  x: number;
  y: number;
  color: string;
  completed: boolean;
  createdDate: string;
  markers: string[];
  stamp?: 'urgent' | 'important' | 'review' | 'completed';
  zIndex: number;
}

export interface Analytics {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
  widgetsByDate: Record<string, number>;
  widgetsByColor: Record<string, number>;
}

export type ColorOption = 'yellow' | 'blue' | 'green' | 'pink' | 'purple' | 'orange';

export const COLOR_MAP: Record<ColorOption, string> = {
  yellow: '#FCD34D',
  blue: '#93C5FD',
  green: '#86EFAC',
  pink: '#F472B6',
  purple: '#D8B4FE',
  orange: '#FED7AA'
};

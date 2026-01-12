import React, { useState } from 'react';
import { Widget, ColorOption, COLOR_MAP } from '../types';
import { Plus } from 'lucide-react';

interface CreateWidgetModalProps {
  onClose: () => void;
  onCreate: (widget: Omit<Widget, 'id' | 'zIndex'>) => void;
}

const CreateWidgetModal: React.FC<CreateWidgetModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<ColorOption>('yellow');
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  const colors: ColorOption[] = ['yellow', 'blue', 'green', 'pink', 'purple', 'orange'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') {
      alert('Please enter a widget title');
      return;
    }

    onCreate({
      title,
      content,
      color,
      x,
      y,
      completed: false,
      createdDate: new Date().toISOString().split('T')[0],
      markers: []
    });

    setTitle('');
    setContent('');
    setColor('yellow');
    setX(50);
    setY(50);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Plus size={28} />
          Create New Widget
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Project Review"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              placeholder="Add details or notes..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Color</label>
            <div className="flex gap-2">
              {colors.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded border-2 transition-transform ${
                    color === c ? 'border-black scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: COLOR_MAP[c] }}
                  title={c}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">X Position ({x}px)</label>
              <input
                type="range"
                value={x}
                onChange={(e) => setX(Number(e.target.value))}
                min="0"
                max="100"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Y Position ({y}px)</label>
              <input
                type="range"
                value={y}
                onChange={(e) => setY(Number(e.target.value))}
                min="0"
                max="100"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWidgetModal;

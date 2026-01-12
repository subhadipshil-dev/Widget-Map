import React, { useState } from 'react';
import { Widget, COLOR_MAP, ColorOption } from '../types';
import { X, Check, Edit2, Stamp } from 'lucide-react';

interface WidgetCardProps {
  widget: Widget;
  onUpdate: (id: string, updates: Partial<Widget>) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

const StampBadge: React.FC<{ stamp?: string }> = ({ stamp }) => {
  const stampStyles: Record<string, string> = {
    urgent: 'bg-red-500 text-white',
    important: 'bg-orange-500 text-white',
    review: 'bg-blue-500 text-white',
    completed: 'bg-green-500 text-white'
  };

  if (!stamp) return null;

  return (
    <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${stampStyles[stamp] || ''}`}>
      {stamp.toUpperCase()}
    </div>
  );
};

const WidgetCard: React.FC<WidgetCardProps> = ({ widget, onUpdate, onDelete, onDragStart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(widget.title);
  const [content, setContent] = useState(widget.content);
  const [showStampMenu, setShowStampMenu] = useState(false);

  const stampOptions: Array<'urgent' | 'important' | 'review' | 'completed'> = ['urgent', 'important', 'review', 'completed'];

  const handleSave = () => {
    onUpdate(widget.id, { title, content });
    setIsEditing(false);
  };

  const toggleComplete = () => {
    onUpdate(widget.id, { completed: !widget.completed });
  };

  const handleAddStamp = (stamp: 'urgent' | 'important' | 'review' | 'completed') => {
    const currentStamps = widget.markers.includes(stamp)
      ? widget.markers.filter(m => m !== stamp)
      : [...widget.markers, stamp];
    onUpdate(widget.id, { markers: currentStamps, stamp });
    setShowStampMenu(false);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, widget.id)}
      className="widget p-4 rounded-lg cursor-move select-none relative"
      style={{ backgroundColor: COLOR_MAP[widget.color as ColorOption] || '#FCD34D' }}
    >
      <StampBadge stamp={widget.stamp} />

      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-2 py-1 border border-gray-400 rounded text-sm font-semibold"
            placeholder="Widget title"
            autoFocus
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-2 py-1 border border-gray-400 rounded text-sm resize-none"
            rows={3}
            placeholder="Widget content"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 bg-gray-300 rounded text-xs hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className={`font-semibold text-sm ${widget.completed ? 'line-through text-gray-600' : ''}`}>
                {title}
              </h3>
              <p className={`text-xs mt-1 ${widget.completed ? 'line-through text-gray-600' : 'text-gray-700'}`}>
                {content}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-600">{widget.createdDate}</span>
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            <button
              onClick={toggleComplete}
              className={`p-1 rounded transition-colors ${
                widget.completed ? 'bg-green-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title="Mark as complete"
            >
              <Check size={16} />
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="p-1 rounded bg-gray-300 hover:bg-gray-400 transition-colors"
              title="Edit widget"
            >
              <Edit2 size={16} />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowStampMenu(!showStampMenu)}
                className="p-1 rounded bg-gray-300 hover:bg-gray-400 transition-colors"
                title="Add stamp"
              >
                <Stamp size={16} />
              </button>

              {showStampMenu && (
                <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
                  {stampOptions.map(stamp => (
                    <button
                      key={stamp}
                      onClick={() => handleAddStamp(stamp)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                        widget.stamp === stamp ? 'bg-blue-100' : ''
                      }`}
                    >
                      {stamp.charAt(0).toUpperCase() + stamp.slice(1)} {widget.stamp === stamp && '✓'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onDelete(widget.id)}
              className="p-1 rounded bg-red-300 hover:bg-red-400 transition-colors ml-auto"
              title="Delete widget"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetCard;

# Widget Notes - Daily Task Manager

A modern, interactive web application for creating and managing daily widget notes with drag-and-drop functionality, markers, stamps, and comprehensive analytics.

## Features

### 📝 Widget Management
- **Create Widgets**: Add daily notes and tasks with titles and descriptions
- **Drag & Drop**: Move widgets to any position on the canvas
- **Color Coding**: Choose from 6 different colors for visual organization
- **Edit & Update**: Modify widget content anytime
- **Delete**: Remove widgets with ease

### ✨ Organization Features
- **Markers & Stamps**: Add status stamps (Urgent, Important, Review, Completed)
- **Mark Complete**: Track completed tasks with visual indicators
- **Date Tracking**: Automatic creation date for each widget
- **Local Storage**: All data persists in your browser

### 📊 Analytics Dashboard
- **Total Tasks**: See how many tasks you've created
- **Completion Rate**: Visual progress indicator
- **Completed vs Pending**: Track your progress
- **Detailed Breakdown**: View widgets by date and color
- **Quick Stats**: Average tasks per day

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd widget-notes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Creating a Widget
1. Click the **"New Widget"** button in the top-right
2. Enter a title and optional content
3. Choose a color and position
4. Click **"Create"**

### Moving Widgets
- Drag any widget to move it to a new position on the canvas
- Widgets snap to your mouse position

### Managing Widgets
- **Edit**: Click the edit icon to modify the title and content
- **Complete**: Click the checkmark icon to mark as complete
- **Stamp**: Click the stamp icon to add status markers
- **Delete**: Click the X icon to remove the widget

### Viewing Analytics
- Click the **Analytics** icon (📊) in the header
- View summary statistics and detailed breakdowns
- Switch between Summary and Details views

## Project Structure

```
src/
├── components/
│   ├── WidgetCard.tsx       # Individual widget display
│   ├── CreateWidgetModal.tsx # Modal for creating widgets
│   └── AnalyticsPanel.tsx    # Analytics dashboard
├── services/
│   └── storageService.ts     # Local storage management
├── types.ts                  # TypeScript interfaces
├── App.tsx                   # Main application component
├── App.css                   # Application styles
├── index.css                 # Global styles
└── main.tsx                  # Entry point
```

## Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **Local Storage API**: Data persistence

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Features in Detail

### Drag & Drop
Widgets use native HTML5 drag-and-drop API for smooth interaction. Simply click and drag any widget to reposition it on the canvas.

### Local Storage
All widgets and settings are saved to your browser's local storage, ensuring your data persists between sessions.

### Analytics
Comprehensive statistics including:
- Total task count
- Completion percentage
- Task distribution by date
- Task distribution by color
- Average tasks per day

## Future Enhancements

- Cloud synchronization
- Recurring tasks/widgets
- Categories and filtering
- Export data (CSV, JSON)
- Dark mode
- Mobile app version
- Collaboration features

## Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Created with ❤️ for daily task management

---

**Enjoy organizing your tasks with Widget Notes! 🎉**

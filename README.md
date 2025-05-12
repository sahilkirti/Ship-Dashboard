# Ship Maintenance Dashboard

A comprehensive web application for managing ship maintenance operations, built with React and modern web technologies.

## Features

### 1. Dashboard
- Overview of maintenance operations
- Quick access to critical information
- Maintenance trend visualization
- Upcoming maintenance alerts

### 2. Ship Management
- List and manage ships
- Detailed ship information
- Maintenance history per ship
- Component tracking

### 3. Component Management
- Track ship components
- Maintenance schedules
- Component status monitoring
- Maintenance history

### 4. Job Management
- Create and track maintenance jobs
- Priority-based job scheduling
- Status tracking
- Assignment to engineers

### 5. Calendar Integration
- Visual maintenance schedule
- Job timeline view
- Drag-and-drop scheduling
- Conflict detection

### 6. Notification System
- Real-time maintenance alerts
- Priority-based notifications
- Upcoming maintenance reminders
- Overdue maintenance alerts

## Tech Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Charts**: Chart.js
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ship-dashboard.git
   cd ship-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
ship-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── Jobs/
│   │   ├── Ships/
│   │   ├── Components/
│   │   └── Notifications/
│   ├── contexts/
│   ├── pages/
│   ├── utils/
│   └── App.jsx
├── public/
├── index.html
└── package.json
```

## Key Components

### Context Providers
- `AuthContext`: Handles user authentication and authorization
- `ShipsContext`: Manages ship data and operations
- `ComponentsContext`: Manages component data and operations
- `JobsContext`: Manages maintenance job data and operations

### Main Features

#### Authentication
- Role-based access control (Admin, Engineer)
- Secure login/logout functionality
- Session management

#### Ship Management
- CRUD operations for ships
- Detailed ship information
- Maintenance history tracking

#### Component Management
- Component tracking and monitoring
- Maintenance scheduling
- Status updates

#### Job Management
- Maintenance job creation and tracking
- Priority-based scheduling
- Status updates and notifications

#### Calendar
- Interactive maintenance schedule
- Job timeline visualization
- Schedule conflict detection

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

### Code Style

- ESLint configuration for code quality
- Prettier for code formatting
- Consistent component structure

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Chart.js for the powerful charting library
- Heroicons for the beautiful icon set

import { useState, useEffect } from 'react';
import { getJobs } from '../utils/localStorageUtils';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [view, setView] = useState('month'); // 'month' or 'week'

  useEffect(() => {
    // Load jobs from localStorage
    const storedJobs = getJobs();
    setJobs(storedJobs);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getJobsForDate = (date) => {
    return jobs.filter(job => {
      const jobDate = new Date(job.scheduledDate);
      return (
        jobDate.getDate() === date.getDate() &&
        jobDate.getMonth() === date.getMonth() &&
        jobDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const renderMonthView = () => {
    const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);
    const days = [];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border p-2 bg-gray-50"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const jobsForDay = getJobsForDate(date);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-24 border p-2 cursor-pointer hover:bg-gray-50 ${
            isToday ? 'bg-blue-50' : ''
          } ${isSelected ? 'bg-blue-100' : ''}`}
        >
          <div className="font-semibold">{day}</div>
          <div className="text-sm">
            {jobsForDay.map(job => (
              <div
                key={job.id}
                className="text-xs p-1 mb-1 rounded bg-blue-100 text-blue-800 truncate"
              >
                {job.type}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="text-center text-xl font-bold mb-4">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-white p-2 text-center font-semibold">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
      <div>
        <div className="text-center text-xl font-bold mb-4">
          Week of {weekDays[0].toLocaleDateString()}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekDays.map((day, index) => {
            const jobsForDay = getJobsForDate(day);
            const isToday = new Date().toDateString() === day.toDateString();
            const isSelected = selectedDate && selectedDate.toDateString() === day.toDateString();

            return (
              <div
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`min-h-[200px] bg-white p-2 ${
                  isToday ? 'bg-blue-50' : ''
                } ${isSelected ? 'bg-blue-100' : ''}`}
              >
                <div className="font-semibold">{dayNames[index]}</div>
                <div className="text-sm">{day.toLocaleDateString()}</div>
                <div className="mt-2">
                  {jobsForDay.map(job => (
                    <div
                      key={job.id}
                      className="text-xs p-1 mb-1 rounded bg-blue-100 text-blue-800"
                    >
                      <div className="font-semibold">{job.type}</div>
                      <div className="text-gray-600">{job.priority} Priority</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Maintenance Calendar</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded ${
              view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded ${
              view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Week
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {view === 'month' ? renderMonthView() : renderWeekView()}
      </div>

      {selectedDate && (
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            Jobs for {selectedDate.toLocaleDateString()}
          </h2>
          <div className="space-y-4">
            {getJobsForDate(selectedDate).map(job => (
              <div key={job.id} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{job.type}</h3>
                    <p className="text-sm text-gray-600">Priority: {job.priority}</p>
                    <p className="text-sm text-gray-600">Status: {job.status}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    job.priority === 'High' ? 'bg-red-100 text-red-800' :
                    job.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {job.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage; 
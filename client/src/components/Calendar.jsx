import React, { useState } from 'react';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import EventForm from './EventForm';
import { useNavigate } from 'react-router-dom';


const Calendar = () => {
  const [currentView, setCurrentView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [events, setEvents] = useState({});
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  const handleAddEvent = (date, event) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [date]: [...(prevEvents[date] || []), event],
    }));
  };

  const handleSelectDay = (date) => {
    setSelectedDate(date);
    setCurrentView('day');
  };

  const handleGoBack = () => {
    setCurrentView('month');
  };

  const handleBackToDay = () => {
    setCurrentView('day');
  }

  return (
    <div className="calendar-container text-gray-800 w-full min-h-screen flex flex-col items-center">
      <img src="/task-flow-logo.png" alt="Task Flow Logo" className="w-[500px] mt-4" />

      <div className="w-full max-w-6xl p-6">
      <header className="text-center py-4 mb-4">
        <h1 className="text-5xl font-bold text-white ">My Calendar</h1>
      </header>
        {currentView === 'month' && (
          <MonthView onSelectDay={handleSelectDay} events={events} />
        )}
        {currentView === 'week' && (
          <WeekView
            weekDays={getWeekDays(selectedDate)}
            events={events}
            onSelectDay={handleSelectDay}
          />
        )}
        {currentView === 'day' && (
          <DayView
            date={selectedDate}
            events={events}
            onAddEvent={() => setCurrentView('eventForm')}
            onGoBack={handleGoBack}
          />
        )}
        {currentView === 'eventForm' && (
          <EventForm
            date={selectedDate}
            onSaveEvent={(date, event) => {
              handleAddEvent(date, event);
              setCurrentView('day');
            }}
            onGoBack={handleBackToDay}
          />
        )}
      </div>
    </div>
  );
};

// Function to generate week days for the week view
const getWeekDays = (selectedDate) => {
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return {
      label: day.toLocaleDateString('en-US', { weekday: 'short' }),
      date: day.toDateString(),
    };
  });
};

export default Calendar;
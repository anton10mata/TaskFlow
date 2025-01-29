import React, { useState } from 'react';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import EventForm from './EventForm';

const Calendar = () => {
  const [currentView, setCurrentView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [events, setEvents] = useState({});

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

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-6xl mx-auto p-6">
        <header className="text-center py-4 mb-8">
          <h1 className="text-3xl font-bold text-green-600">My Calendar</h1>
        </header>

        <div className="bg-white shadow-md rounded-lg p-6">
          {currentView === 'month' && (
            <MonthView
              onSelectDay={handleSelectDay}
              events={events}
            />
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

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

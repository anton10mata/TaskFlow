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

  return (
    <div>
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
  );
};

// Utility function to get the days in the current week
const getWeekDays = (selectedDate) => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Get Sunday of the week
  
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

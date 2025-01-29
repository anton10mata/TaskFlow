import React from 'react';

const WeekView = ({ weekDays, events, onSelectDay }) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {weekDays.map((day, index) => (
        <div
          key={index}
          className="p-4 border cursor-pointer"
          onClick={() => onSelectDay(day.date)}
        >
          <div className="font-bold text-center">{day.label}</div>
          <div className="text-center text-sm">{day.date}</div>
          {events[day.date] && (
            <div className="text-xs mt-1 text-blue-500">
              {events[day.date].length} events
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WeekView;

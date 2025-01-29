import React from 'react';

const MonthView = ({ onSelectDay, events }) => {
  const daysInMonth = new Date(2025, 1, 0).getDate(); // Adjust for the desired month/year
  const firstDay = new Date(2025, 0, 1).getDay(); // Adjust for the desired month/year

  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDay + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  return (
    <div>
      {/* Days of the Week Labels */}
      <div className="grid grid-cols-7 text-center font-bold mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-2 border ${
              day ? 'cursor-pointer bg-gray-100 hover:bg-gray-200' : 'bg-gray-300'
            }`}
            onClick={() => day && onSelectDay(day)}
          >
            {day}
            {day && events[day] && (
              <div className="text-xs mt-1 text-blue-500">
                {events[day].length} events
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;

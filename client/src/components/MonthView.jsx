import React from 'react';

const MonthView = ({ onSelectDay, events }) => {
  const daysInMonth = new Date(2025, 1, 0).getDate();
  const firstDay = new Date(2025, 0, 1).getDay();

  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDay + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  return (
    <div className="p-4 bg-blue-500 rounded-lg shadow-lg">
      {/* Days of the Week Labels */}
      <div className="grid grid-cols-7 text-center font-bold text-xl mb-4 text-white p-6 bg-blue-700 rounded-lg shadow-lg">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0 border-2 border-green-500 border-collapse">
        {days.map((day, index) => (
          <div
            key={index}
            className={`h-32 flex flex-col justify-center items-center text-xl font-bold border-2 border-green-500 rounded-lg ${
              day ? 'cursor-pointer bg-blue-600 hover:bg-blue-800 text-white' : 'bg-gray-400 text-gray-300'
            }`}
            onClick={() => day && onSelectDay(day)}
          >
            {day}
            {day && events[day] && (
              <div className="text-sm mt-1 text-yellow-300">
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

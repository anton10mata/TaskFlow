import React from 'react';

const DayView = ({ date, events, onAddEvent }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Events for {date}</h2>
      <ul>
        {(events[date] || []).map((event, index) => (
          <li key={index} className="mb-2">
            {event}
          </li>
        ))}
      </ul>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => onAddEvent(date)}
      >
        Add Event
      </button>
    </div>
  );
};

export default DayView;
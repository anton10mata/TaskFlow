import React from 'react';

const DayView = ({ date, events, onAddEvent, onGoBack }) => {
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
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
          onClick={() => onAddEvent(date)}
        >
          Add Event
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded"
          onClick={onGoBack}
        >
          Back to Month View
        </button>
      </div>
    </div>
  );
};

export default DayView;

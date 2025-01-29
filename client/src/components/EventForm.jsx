import React, { useState } from 'react';

const EventForm = ({ date, onSaveEvent }) => {
  const [eventName, setEventName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventName) {
      onSaveEvent(date, eventName);
      setEventName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-lg font-bold mb-4">Add Event for {date}</h2>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Event name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Save Event
      </button>
    </form>
  );
};

export default EventForm;

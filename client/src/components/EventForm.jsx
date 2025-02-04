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

// import { gql, useMutation } from "@apollo/client";
// import { useState } from "react";

// // Define the CREATE_EVENT mutation
// const CREATE_EVENT = gql`
//   mutation CreateEvent($title: String!, $date: String!) {
//     createEvent(title: $title, date: $date) {
//       id
//       title
//       date
//     }
//   }
// `;

// const EventForm = ({ date }) => {
//   const [eventName, setEventName] = useState("");
  
//   // Use the correct mutation with JWT token included in headers
//   const [createEvent] = useMutation(CREATE_EVENT, {
//     context: {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,  // Include JWT token
//       },
//     },
//   });

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await createEvent({
//         variables: {
//           title: eventName,
//           date: date, // Assuming `date` is passed as a prop
//         },
//       });
//       console.log("Event saved:", data);
//     } catch (error) {
//       console.error("Error saving event:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4">
//       <h2 className="text-lg font-bold mb-4">Add Event for {date}</h2>
//       <input
//         type="text"
//         className="w-full p-2 border rounded mb-4"
//         placeholder="Event name"
//         value={eventName}
//         onChange={(e) => setEventName(e.target.value)}
//       />
//       <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
//         Save Event
//       </button>
//     </form>
//   );
// };

// export default EventForm;


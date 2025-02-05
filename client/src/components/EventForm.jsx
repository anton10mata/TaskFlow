import React, { useState } from 'react';

const EventForm = ({ date, onSaveEvent, onGoBack }) => {
  const [eventName, setEventName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventName) {
      onSaveEvent(date, eventName);
      setEventName('');
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
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
        <button
          type="button"
          className="bg-slate-600 text-white py-2 px-4 rounded"
          onClick={onGoBack} 
        >
          Back to Day View
        </button>
      </form>
    </div>
  );
};

export default EventForm;

// import React, { useState } from 'react';
// import { gql, useMutation } from "@apollo/client";

// const AddEventMutation = gql`
//   mutation CreateEvent($title: String!, $date: String!) {
//     createEvent(title: $title, date: $date) {
//       id
//       title
//       date
//     }
//   }
// `;

// const EventForm = ({ date, onSaveEvent, onGoBack }) => {
//   const [eventName, setEventName] = useState('');
//   const [createEvent] = useMutation(AddEventMutation, {
//     context: {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,  // Include JWT token
//       },
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await createEvent({
//         variables: {
//           title: eventName,
//           date: date, 
//         },
//       });
//       console.log("Event saved:", data);
//     } catch (error) {
//       console.error("Error saving event:", error);
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//       <form onSubmit={handleSubmit} className="p-4">
//         <h2 className="text-lg font-bold mb-4">Add Event for {date}</h2>
//         <input
//           type="text"
//           className="w-full p-2 border rounded mb-4"
//           placeholder="Event name"
//           value={eventName}
//           onChange={(e) => setEventName(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-green-500 text-white py-2 px-4 rounded"
//         >
//           Save Event
//         </button>
//         <button
//           type="button"
//           className="bg-gray-500 text-white py-2 px-4 rounded"
//           onClick={onGoBack} 
//         >
//           Back to Day View
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EventForm;
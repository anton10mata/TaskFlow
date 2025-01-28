import React, { useState } from "react";
import { addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, format } from "date-fns";

const Calendar = () => {
  const [view, setView] = useState("month"); // "month", "week", or "day"
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderMonth = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const days = [];

    let day = start;
    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }

    return (
      <div className="grid grid-cols-7">
        {days.map((day) => (
          <button key={day.toString()} onClick={() => handleDayClick(day)}>
            {format(day, "d")}
          </button>
        ))}
      </div>
    );
  };

  const renderWeek = () => {
    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);
    const days = [];

    let day = start;
    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }

    return (
      <div className="flex">
        {days.map((day) => (
          <button key={day.toString()} onClick={() => handleDayClick(day)}>
            {format(day, "eeee")}
          </button>
        ))}
      </div>
    );
  };

  const renderDay = () => <div>{format(selectedDate, "PPPP")}</div>;

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setView("day");
  };

  return (
    <div>
      {view === "month" && renderMonth()}
      {view === "week" && renderWeek()}
      {view === "day" && renderDay()}
      <button onClick={() => setView("month")}>Back to Month</button>
      {view !== "month" && <button onClick={() => setView("week")}>Back to Week</button>}
    </div>
  );
};

export default Calendar;

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const InstructorCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Test Drive Session',
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate(),
      allDay: false
    }
  ]);

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default InstructorCalendar;

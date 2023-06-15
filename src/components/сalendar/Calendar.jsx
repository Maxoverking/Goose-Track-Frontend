import { CalendarHeaderDays } from './calendarHeaderDays/CalendarHeaderDays';
import { CalendarGrid } from './сalendarGrid/CalendarGrid';
import { CalendarHeader } from './сalendarHeader/CalendarHeader';
import css from './Calendar.module.scss';

const Calendar = () => {
  return (
    <div className={css.calendar_wrapper}>
      <CalendarHeader />
      <CalendarHeaderDays />
      <CalendarGrid />
    </div>
  );
};

export default Calendar;

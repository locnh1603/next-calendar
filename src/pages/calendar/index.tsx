import { useEffect } from 'react';
import CalendarPanel from '@src/pages/calendar/calendar-panel'
import DayPanel from '@src/pages/calendar/day-panel';
import { useAppDispatch } from '@src/app/hooks';
import { getCalendarItems } from '@src/pages/calendar/calendar.slice';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const FullCalendar: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  console.log(session);
  useEffect(() => {
    dispatch(getCalendarItems(session?.user?.email || ''));
  });
  return (
    <div className="p-3">
      <div className="container full-calendar w-100 p-0">
        <div className="row">
          <div className="col-9">
            <CalendarPanel />
          </div>
          <div className="col-3">
            <DayPanel />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FullCalendar;
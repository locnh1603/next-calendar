import { NextPage } from 'next';
import moment, { Moment } from 'moment';
import { Calendar, Card } from 'antd';
import { useAppDispatch, useAppSelector } from '@src/app/hooks';
import { calendarSelector, setCalendarMode, setDay } from '@src/pages/fullcal/calendar.slice';

const CalendarPanel: NextPage = () => {
  const dispatch = useAppDispatch();
  const calendarState = useAppSelector(calendarSelector);
  
  const onSelect = (value: Moment) => {
    dispatch(setDay(value.valueOf()));
  };

  const onPanelChange = (value: Moment, mode: 'month' | 'year') => {
    if (calendarState.calendarMode !== mode) {
      dispatch(setCalendarMode(mode));
    }
  };

  return (
    <>
      <Card className="left-panel">
        <Calendar onSelect={onSelect} onPanelChange={onPanelChange} value={moment(calendarState.selectedDay)}/>
      </Card>
    </>
  );
};
export default CalendarPanel;
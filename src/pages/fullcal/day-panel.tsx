import { Card } from 'antd';
import { NextPage } from 'next';
import moment from 'moment'
import { calendarSelector } from '@src/pages/fullcal/calendar.slice';
import { useAppSelector } from '@src/app/hooks';

const DayPanel: NextPage = () => {
  const calendarState = useAppSelector(calendarSelector);
  const title = calendarState.calendarMode === 'month' ? moment(calendarState.selectedDay).format('LL') : moment(calendarState.selectedDay).format('MMMM yyyy')
  return (
    <>
      <Card className="right-panel" title={title}>
      </Card>
    </>
  );
};
export default DayPanel;
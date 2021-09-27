import { NextPage } from 'next';
import { Moment } from 'moment';
import { Calendar, Card } from 'antd';

const CalendarPanel: NextPage = () => {
  const onSelect = (value: Moment) => {
    console.log(value.format('DD/MM/yyyy'));
  }
  return (
    <>
      <Card className="left-panel">
        <Calendar onSelect={onSelect} />
      </Card>
    </>
  )
};
export default CalendarPanel
import { ReactElement } from 'react';
import AppLayout from '@components/layout'
import { NextPageWithLayout } from '@app/pages/_app';
import { PageHeader } from 'antd';
import CalendarPanel from '@pages/fullcal/calendar-panel'
import DayPanel from '@app/pages/fullcal/day-panel';
const FullCalendar: NextPageWithLayout = () => {
  return (
    <>
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
    </>
  );
};
FullCalendar.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  );
};
export default FullCalendar;
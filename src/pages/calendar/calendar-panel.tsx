import { NextPage } from 'next';
import moment, { Moment } from 'moment';
import { Calendar, Card, Popover, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '@src/app/hooks';
import { calendarSelector, deleteItem, editItem, selectItem, setDay } from '@src/pages/calendar/calendar.slice';
import { CalendarItem } from '@src/app/model/calendar-item.model';
import CalendarItemForm from '@src/pages/calendar/calendar-item-form';
import { useState } from 'react';
import { ContrastColor, hexToRgb } from '@src/app/utility/color';

const CalendarPanel: NextPage = () => {
  const dispatch = useAppDispatch();
  const calendarState = useAppSelector(calendarSelector);
  const [isLoading, setLoading] = useState(false);
  const [shouldShowModal, setModal] = useState(false);
  const onSelect = (value: Moment) => {
    dispatch(setDay(value.valueOf()));
  };
  const sortItemsByDate = (items: CalendarItem[]) => {
    return items.sort((a, b) => {
      return a.date - b.date;
    })
  }
  const getDateItemFromDateValue = (value: Moment) => {
    const month = value.month();
    const day = value.date();
    const calendarItems = calendarState.calendarItems.filter(i => {
      const targetDate = moment(i.date);
      return targetDate.date() === day && targetDate.month() === month;
    });
    return calendarItems;
  };
  const getDateItemFromMonthValue = (value: Moment) => {
    const month = value.month();
    const calendarItems = calendarState.calendarItems.filter(i => {
      const targetDate = moment(i.date);
      return targetDate.month() === month;
    });
    return calendarItems;
  };
  const formCallBack = (value: any) => {
    const data = {
      ...calendarState.selectedCalendarItem,
      ...value
    };
    setLoading(true);
    dispatch(editItem(data)).then(() => {
      setLoading(false);
      setModal(false);
    }).catch(e => {
      console.log(e);
      setLoading(false);
    });
  }
  const closeModal = () => {
    setModal(false);
  }
  const showModal = () => {
    setModal(true);
  }
  const deleteCallback = () => {
    const targetId = calendarState.selectedCalendarItem?.id;
    if (!targetId) {
      return;
    }
    setLoading(true);
    dispatch(deleteItem(targetId)).then(() => {
      setLoading(false);
      setModal(false);
    }).catch(e => {
      console.log(e);
      setLoading(false);
    });
  }
  const dateCellRender = (value: Moment) => {
    const dateItems = sortItemsByDate(getDateItemFromDateValue(value));
    const itemsCount = dateItems.length !== 0 ? <p className="small m-0">{dateItems.length} item(s)</p> : <></>;
    const cardDetailContent = (item: CalendarItem) => {
      return (
        <div className="calendar-item-popover">
          <div className="title">
            {item.title}
          </div>
          <div className="content">
            {item.content}
          </div>
        </div>
      );
    };
    const editItem = async (e: any) => {
      e.stopPropagation();
      dispatch(selectItem(e.target.id)).then(() => showModal());
    };
    return (
      <ul className='calendar-items pb-2'>
        {itemsCount}
        {dateItems.map((i, index) => {
          const color = hexToRgb(i.color) || {r: 0, g: 0, b: 0};
          const textColor = ContrastColor(color);
          return (<li key={index}>
            <Popover placement="rightTop" content={cardDetailContent(i)} trigger="hover">
              <div className="calendar-item-card" id={i.id} onClick={editItem} style={{ backgroundColor: i.color, color: textColor }}><span id={i.id}>{i.title}</span><span id={i.id} className="clock">{moment(i.date).format('HH:mm')}</span></div>
            </Popover>
          </li>);
        })}
      </ul>
    )
  };

  const monthCellRender = (value: Moment) => {
    const dateItems = getDateItemFromMonthValue(value);
    const itemsCount = dateItems.length !== 0 ? <p className="small m-0">{dateItems.length} item(s)</p> : <></>;
    return (
      <div className="text-right">{itemsCount}</div>
    );
  }

  return (
    <>
      <Card className="left-panel" title="Calendar">
        <Calendar dateCellRender={dateCellRender} onSelect={onSelect} value={moment(calendarState.selectedDay)} monthCellRender={monthCellRender}/>
      </Card>
      <Modal
        title={'Edit Calendar Item'}
        centered
        visible={shouldShowModal}
        onCancel={closeModal}
        footer={null}
      >
        <CalendarItemForm callBack={formCallBack} loading={isLoading} edit={true} deleteCallback={deleteCallback}></CalendarItemForm>
      </Modal>
    </>
  );
};
export default CalendarPanel;
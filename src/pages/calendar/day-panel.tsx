import { Card, Button, Modal } from 'antd';
import { NextPage } from 'next';
import moment from 'moment'
import { addItem, calendarSelector, deleteItem, editItem, selectItem } from '@src/pages/calendar/calendar.slice';
import { useAppDispatch, useAppSelector } from '@src/app/hooks';
import CalendarItemForm from '@src/pages/calendar/calendar-item-form';
import { useState } from 'react';
import { CalendarItem } from '@src/app/model/calendar-item.model';
import { useSession } from 'next-auth/react';
import CalendarItemCard from '@src/pages/calendar/calendar-item-card';

const DayPanel: NextPage = () => {
  const calendarState = useAppSelector(calendarSelector);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [shouldShowAddModal, setAddModal] = useState(false);
  const [shouldShowEditModal, setEditModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const title = moment(calendarState.selectedDay).format('LL');

  const showAddModal = () => {
    setAddModal(true);
  };
  const closeAddModal = () => {
    setAddModal(false);
  };
  const showEditModal = () => {
    setEditModal(true);
  };
  const closeEditModal = () => {
    setEditModal(false);
  };
  const addFormCallBack = (value: CalendarItem) => {
    value.email = session?.user?.email || '';
    setLoading(true);
    dispatch(addItem(value)).then(() => {
      setLoading(false);
      setAddModal(false);
    }).catch(e => {
      console.log(e);
      setLoading(false);
    });
  };
  const editFormCallBack = (value: CalendarItem) => {
    const data = {
      ...calendarState.selectedCalendarItem,
      ...value
    };
    setLoading(true);
    dispatch(editItem(data)).then(() => {
      setLoading(false);
      setEditModal(false);
    }).catch(e => {
      console.log(e);
      setLoading(false);
    });
  };
  const deleteFormCallBack = (id: string) => {
    const targetId = calendarState.selectedCalendarItem?.id;
    if (!targetId) {
      return;
    }
    setLoading(true);
    dispatch(deleteItem(targetId)).then(() => {
      setLoading(false);
      setEditModal(false);
    }).catch(e => {
      console.log(e);
      setLoading(false);
    });
  }
  const editCalendarItem = (e: any) => {
    console.log(e.target);
    dispatch(selectItem(e.target.id)).then(() => showEditModal());
  }
  const itemList = calendarState.calendarItems.filter(i => {
    return moment(i.date).date() === moment(calendarState.selectedDay).date();
  }).map((i, index) => {
    return (
      <CalendarItemCard id={i.id} key={index} item={i} onClick={editCalendarItem}>
      </CalendarItemCard>
    );
  });
  return (
    <>
      <Card className="right-panel" title={title}>
        <Button onClick={showAddModal} disabled={calendarState.calendarMode === 'year'}>Add Calendar Item</Button>
        {itemList}
      </Card>
      <Modal
        title={'Create Calendar item'}
        centered
        visible={shouldShowAddModal}
        onCancel={closeAddModal}
        footer={null}
      >
        <CalendarItemForm callBack={addFormCallBack} loading={isLoading} edit={false} deleteCallback={() => {}}></CalendarItemForm>
      </Modal>
      <Modal
        title={'Edit Calendar item'}
        centered
        visible={shouldShowEditModal}
        onCancel={closeEditModal}
        footer={null}
      >
        <CalendarItemForm callBack={editFormCallBack} loading={isLoading} edit={true} deleteCallback={deleteFormCallBack}></CalendarItemForm>
      </Modal>
    </>
  );
};
export default DayPanel;
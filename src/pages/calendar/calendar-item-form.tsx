import { NextPage } from 'next';
import { Button, Input, Form, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { ColorResult, SketchPicker } from 'react-color';
import { useAppSelector } from '@src/app/hooks';
import { calendarSelector } from '@src/pages/calendar/calendar.slice';
import { DefaultColors } from '@src/app/enum/color.enum';

const CalendarItemForm: NextPage<{ callBack: (values: any) => void, loading: boolean, edit: boolean, deleteCallback: (id: string) => void }, any> = ({ callBack, loading, edit, deleteCallback }) => {
  const [selectedColor, setColor] = useState(DefaultColors.White as string);
  const calendarState = useAppSelector(calendarSelector);
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    form.validateFields()
      .then(values => {
        callBack(values);
      });
  };
  const handleColorChange = (color: ColorResult) => {
    const value = {
      title: form.getFieldValue('title'),
      content: form.getFieldValue('content'),
      date: form.getFieldValue('date'),
      color: color.hex
    };
    setColor(color.hex);
    form.setFieldsValue(value);
  };
  const handleDelete = () => {
    console.log(calendarState.selectedCalendarItem?.id);
    const targetId = calendarState.selectedCalendarItem?.id;
    if (!targetId) {
      return;
    }
    deleteCallback(targetId);
  }
  useEffect(() => {
    const value = calendarState.selectedCalendarItem;
    form.resetFields();
    if (value && edit) {
      form.setFieldsValue({
        title: value.title,
        content: value.content,
        date: moment(value.date),
        color: value.color
      });
      handleColorChange({ hex: value.color } as ColorResult);
    };
  });
  return (
    <>
      <Form layout="vertical" form={form} name="calendar-item-form">
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="date" label="On" initialValue={moment()} rules={[{ required: true, message: 'Target date is required' }]}>
          <DatePicker className="w-100" showTime />
        </Form.Item>
        <Form.Item name="color" label="Color" initialValue={DefaultColors.White}>
          <Input />
        </Form.Item>
        <SketchPicker
          className="color-selector"
          color={selectedColor}
          onChangeComplete={handleColorChange}
        />
      </Form>
      <div className="row p-2">
        <Button className="submit-btn mt-4 mr-2 col" onClick={handleSubmit} loading={loading}>Submit</Button>
        {edit === true ?
          <Button className="submit-btn mt-4 col" type="primary" danger onClick={handleDelete} loading={loading}>Delete</Button> : <></>
        }
      </div>
    </>
  );
};
export default CalendarItemForm;
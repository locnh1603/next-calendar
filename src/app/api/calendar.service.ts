import { CalendarItem } from '@src/app/model/calendar-item.model';
import axios from 'axios';
import { v4 } from 'uuid';

const URL = `http://localhost:4000/calendar-items`;

export const getAllCalendarItemsByEmail = (email?: string) => {
  return axios.get(`${URL}?email=${email}`);
}

export const postCalendarItem = (item: CalendarItem) => {
  const id = v4();
  return axios.post(URL, {...item, id});
}

export const getCalendarItem = (id: string) => {
  return axios.get(`${URL}/${id}`);
}

export const patchCalendarItem = (item: CalendarItem) => {
  const {id, ...payload} = item;
  return axios.patch(`${URL}/${id}`, payload);
}

export const deleteCalendarItem = (id: string) => {
  return axios.delete(`${URL}/${id}`);
}
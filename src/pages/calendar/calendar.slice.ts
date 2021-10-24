import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import type { AppState } from '@app/store';
import { CalendarItem } from '@src/app/model/calendar-item.model';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import { deleteCalendarItem, getAllCalendarItemsByEmail, getCalendarItem, patchCalendarItem, postCalendarItem } from '@src/app/api/calendar.service';


export interface CalendarState {
  selectedDay: number,
  selectedMonth: number,
  calendarItems: CalendarItem[],
  calendarMode: CalendarMode,
  selectedCalendarItem?: CalendarItem
}

const initialState: CalendarState = {
  selectedDay: moment().valueOf(),
  selectedMonth: moment().valueOf(),
  calendarItems: [],
  calendarMode: 'month',
  selectedCalendarItem: undefined
}

export const getCalendarItems = createAsyncThunk(
  'calendar/getCalendarItems',
  async (email: string) => {
    const response = await getAllCalendarItemsByEmail(email);
    return response.data as CalendarItem[];
  }
)

export const addItem = createAsyncThunk(
  'calendar/addItem',
  async (item: CalendarItem) => {
    const response = await postCalendarItem(item);
    return response.data as CalendarItem;
  }
)

export const selectItem = createAsyncThunk(
  'calendar/selectItem',
  async (id: string) => {
    const response = await getCalendarItem(id);
    return response.data as CalendarItem;
  }
)

export const editItem = createAsyncThunk(
  'calendar/editItem',
  async (item: CalendarItem) => {
    const response = await patchCalendarItem(item);
    return response.data as CalendarItem;
  }
)

export const deleteItem = createAsyncThunk(
  'calendar/deleteItem',
  async (id: string) => {
    const response = await deleteCalendarItem(id);
    return response.data as CalendarItem;
  }
)

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDay: (state, action: PayloadAction<number>) => {
      state.selectedDay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCalendarItems.fulfilled, (state, action) => {
      state.calendarItems = action.payload;
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.calendarItems.push(action.payload);
    });
    builder.addCase(selectItem.fulfilled, (state, action) => {
      state.selectedCalendarItem = action.payload;
    });
    builder.addCase(editItem.fulfilled, (state, action) => {
      const targetIdx = state.calendarItems.findIndex(i => i.id === action.payload.id);
      state.calendarItems[targetIdx] = action.payload;
    });
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      const targetIdx = state.calendarItems.findIndex(i => i.id === action.payload.id);
      state.calendarItems.splice(targetIdx, 1);
    });
  },
})

export const { setDay } = calendarSlice.actions

export const calendarSelector = (state: AppState) => state.calendar

export default calendarSlice.reducer;
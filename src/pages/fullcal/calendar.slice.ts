import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment, { Moment } from 'moment';
import type { AppState } from '@app/store';


export interface CalendarState {
  selectedDay: number,
  selectedMonth: number,
  calendarMode: 'month' | 'year'
}

const initialState: CalendarState = {
  selectedDay: moment().valueOf(),
  selectedMonth: moment().valueOf(),
  calendarMode: 'month'
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDay: (state, action: PayloadAction<number>) => {
      state.selectedDay = action.payload;
    },
    setMonth: (state, action: PayloadAction<number>) => {
      state.selectedMonth = action.payload;
    },
    setCalendarMode: (state, action: PayloadAction<'month' | 'year'>) => {
      state.calendarMode = action.payload;
    }
  }
})

export const { setDay, setMonth, setCalendarMode } = calendarSlice.actions

export const calendarSelector = (state: AppState) => state.calendar

export default calendarSlice.reducer;
import { DvaModelBuilder } from 'dva-model-creator';
import { addSchedule, setCalendar, setCurrentDate, setCalendarMode } from '@/actions/calendar.action';
import Schedule from '@/common/types/schedule.type';
import Calendar from '@/common/types/calendar.type';
import moment from 'moment';

export interface ICalendarState {
  schedules: Schedule[];
  calendars: Calendar[];
  currentDate: moment.Moment;
  calendarMode: CalendarMode;
}

export enum CalendarMode {
  month = 'month',
  week = 'week',
  day = 'day',
  twoWeeks = 'twoWeeks',
}

const initState: ICalendarState = {
  schedules: [],
  calendars: [],
  currentDate: moment(),
  calendarMode: CalendarMode.month,
};

const builder = new DvaModelBuilder<ICalendarState>(initState, 'calendar')
  .immer(addSchedule, (state, payload: any) => {
    return state.schedules.push(payload);
  })
  .immer(setCalendar, setCalendarHandler)
  .immer(setCurrentDate, setCurrentDateHandler)
  .immer(setCalendarMode, setCalendarModeHandler);

function setCalendarHandler(state: ICalendarState, payload: any) {
  Object.assign(state.calendars, payload);
  return state;
}

function setCurrentDateHandler(state: ICalendarState, payload: any) {
  state.currentDate = moment(payload);
}

function setCalendarModeHandler(state: ICalendarState, payload: any) {
  state.calendarMode = payload;
}

export default builder.build();
export const actions = {
  addSchedule,
};

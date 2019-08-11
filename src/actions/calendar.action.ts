import { actionCreatorFactory } from 'dva-model-creator';
import moment from 'moment';
import { CalendarMode } from '@/models/calendar.model';

const actionCreator = actionCreatorFactory('calendar');

export const addSchedule = actionCreator('addSchedule');
export const setCalendar = actionCreator('setCalendar');
export const setCurrentDate = actionCreator<moment.Moment>('setCurrentDate');
export const setCalendarMode = actionCreator<CalendarMode>('setCalendarMode');

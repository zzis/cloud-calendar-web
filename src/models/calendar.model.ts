import { DvaModelBuilder } from 'dva-model-creator';
import { addSchedule, addCalendar } from '@/actions/calendar.action';
import Schedule from '@/common/types/schedule.type';
import Calendar from '@/common/types/calendar.type';

export interface ICalendarState {
  schedules: Schedule[];
  calendars: Calendar[];
}

const initState: ICalendarState = {
  schedules: [],
  calendars: [],
};

const builder = new DvaModelBuilder<ICalendarState>(initState, 'calendar')
  .immer(addSchedule, (state, payload: any) => {
    return state.schedules.push(payload);
  })
  .immer(addCalendar, addCalendarHandler);

function addCalendarHandler(state: ICalendarState, payload: any) {
  Object.assign(state.calendars, payload);
  return state;
}

export default builder.build();
export const actions = {
  addSchedule,
};

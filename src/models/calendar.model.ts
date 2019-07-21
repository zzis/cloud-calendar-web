import { DvaModelBuilder } from 'dva-model-creator';
import { addSchedule } from '@/actions/calendar.action';
import Schedule from '@/common/types/schedule.type';

export interface ICalendarState {
  schedules: Schedule[];
}

const initState: ICalendarState = {
  schedules: [],
};

const builder = new DvaModelBuilder<ICalendarState>(initState, 'calendar')
  // .case(addSchedule, addCalendarHandle);
  .immer(addSchedule, (state, payload: any) => {
    state.schedules.push(payload);
  });

function addCalendarHandle(state: ICalendarState, payload: any) {
  state.schedules.push(payload);
  return state;
}

export default builder.build();
export const actions = {
  addSchedule,
};

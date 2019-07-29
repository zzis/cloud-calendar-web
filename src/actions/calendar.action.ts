import { actionCreatorFactory } from 'dva-model-creator';

const actionCreator = actionCreatorFactory('calendar');

export const addSchedule = actionCreator('addSchedule');
export const addCalendar = actionCreator('addCalendar');

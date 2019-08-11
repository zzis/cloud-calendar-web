import ISchedule from './schedule.type';

export default interface ICalendar {
  id: string;
  name: string;
  borderColor: string;
  bgColor: string;
  schedules: ISchedule[];
}

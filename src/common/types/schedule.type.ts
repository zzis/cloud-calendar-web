export default interface ISchedule {
  id: number;
  title: string;
  location?: string;
  calendarId: string;
  start?: string;
  end?: string;
}

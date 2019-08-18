import ICalendar from "@/common/types/calendar.type";
import moment from 'moment';
import ISchedule from "@/common/types/schedule.type";

export interface ICategoryTimeSpendInM {
  // category time spent
  [category: string]: number;
}

export interface IFiteredCategoryByPeriod {
  [category: string]: ISchedule[];
}

export interface ICategoryListItem {
  title: string;
  timeSpentInM: number;
}

export interface ICategoryListData {
  [category: string]: ICategoryListItem[];
}


export default class StatisticModel {
  public DATE_TYPE_LIST = {
    day: '日',
    week: '周',
    month: '月',
  };
  
  public getCategoryInPeriod(calendars: ICalendar[], currentDate: moment.Moment, dateType: string): IFiteredCategoryByPeriod{
    const startOfPeriod = currentDate.clone().startOf(dateType as any);
    const endOfPeriod = currentDate.clone().endOf(dateType as any);
    const filteredCategoryByPeriod: IFiteredCategoryByPeriod = {};
    calendars.forEach((calendar) => {
      const filterSchedules: ISchedule[] = [];
      calendar.schedules.forEach((schedule) => {
        if (this.isEventInBetween(schedule, startOfPeriod, endOfPeriod)) {
          filterSchedules.push(schedule);
        }
      });
      filteredCategoryByPeriod[calendar.name] = filterSchedules;
    });
    return filteredCategoryByPeriod;
  }

  public getCategoryTimeSpent(filteredCategoryByPeriod: IFiteredCategoryByPeriod): ICategoryTimeSpendInM {
    const categoryTimeSpent = {};
    for (const category in filteredCategoryByPeriod) {
      let timeSpentInM = 0;
      filteredCategoryByPeriod[category].forEach((schedule) => {
        timeSpentInM += Math.abs(moment(schedule.start).diff(moment(schedule.end), 'minutes'));
      });
      categoryTimeSpent[category] = timeSpentInM;
    }
    return categoryTimeSpent;
  }

  public getCategoryListData(categoryInPeriod: IFiteredCategoryByPeriod): ICategoryListData {
    const categoryListData: ICategoryListData = {};
    for (const category in categoryInPeriod) {
      const listData: ICategoryListItem[] = [];
      categoryInPeriod[category].forEach((schedule) => {
        const data = listData.find((item) => item.title === schedule.title);
        if (!data) {
          listData.push({title: schedule.title, timeSpentInM: Math.abs(moment(schedule.start).diff(moment(schedule.end), 'minutes'))});
        } else {
          data.timeSpentInM += Math.abs(moment(schedule.start).diff(moment(schedule.end), 'hours'));
        }
      })
      categoryListData[category] = listData;
    }
    return categoryListData;
  }

  public isEventInBetween(schedule: ISchedule, start: moment.Moment, end: moment.Moment) {
    return moment(schedule.start).isAfter(start) && moment(schedule.end).isBefore(end);
  }
}

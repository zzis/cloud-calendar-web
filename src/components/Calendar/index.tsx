import React from 'react';
import BaseCalendar from 'tui-calendar';
import { connect } from 'dva';
import { Bind } from 'lodash-decorators';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import shortId from 'short-uuid';
import moment from 'moment';
import calendarService from '@/services/calendar.service';
import { setCalendar } from '@/actions/calendar.action';

import { actions, ICalendarState } from '@/models/calendar.model';
import { IUmiComponentProps } from '@/common/types/umi.type';
import style from './index.less';
import ButtonBar, { CALENDAR_MODE_MAP } from './hooks/ButtonBar';
import { CalendarMode } from '@/models/calendar.model';

export interface ICalendarComponentProps {}

export interface ICalendarComponentState {
}

type CalendarProps = IUmiComponentProps & ICalendarComponentProps & ReturnType<typeof mapStateToProps>;

class Calendar extends React.Component<CalendarProps, ICalendarComponentState> {

  private calRef: any = React.createRef();
  private calendar: BaseCalendar;

  constructor(props, context) {
    super(props);
  }

  public componentDidMount() {
    this.initCalendar();
    this.initCalendarData();
  }

  public componentWillReceiveProps(nextProps: CalendarProps) {
    this.updateCalendar(nextProps.calendars);
    this.updateCurrentDate(nextProps.currentDate, nextProps.calendarMode);
    this.updateCalendarView(nextProps.calendarMode);
  }

  public updateCalendarView(calendarMode: CalendarMode) {
    if (calendarMode === this.props.calendarMode) {
      return;
    }
    switch (calendarMode) {
      case CalendarMode.daily:
        this.calendar.changeView('day', true);
        this.calendar.scrollToNow();
        break;
      case CalendarMode.weekly:
        this.calendar.changeView('week', true);
        this.calendar.scrollToNow();
        break;
      case CalendarMode.monthly:
        this.calendar.setOptions({month: {visibleWeeksCount: 6, isAlways6Week: false}}, true);
        this.calendar.changeView('month', true);
        break;
      case CalendarMode.twoWeeks:
        this.calendar.setOptions({month: {visibleWeeksCount: 2}}, true);
        this.calendar.changeView('month', true);
        break;
    }
  }

  public updateCurrentDate(currentDate: moment.Moment, calendarMode: CalendarMode) {
    this.calendar.setDate(currentDate.startOf(CALENDAR_MODE_MAP[calendarMode]).format('YYYY-MM-DD'));
  }

  public updateCalendar(calendars) {
    if (JSON.stringify(calendars) === JSON.stringify(this.props.calendars)) {
      return;
    }
    this.calendar.setCalendars(calendars);
    calendars.forEach((calendar) => {
      const { schedules } = calendar;
      schedules.forEach((schedule) => {
        // check if schedule exists
        if (this.calendar.getSchedule(schedule.id, calendar.id)) {
          return;
        }
        this.calendar.createSchedules([Object.assign(schedule, {
          start: moment(schedule.start).utc().format(),
          end: moment(schedule.end).utc().format(),
          category: 'time',
          borderColor: calendar.bgColor,
          bgColor: calendar.bgColor,
          dragBgColor: calendar.bgColor,
        })]);
      });
    });
  }

  public initCalendar() {
    this.calendar = new BaseCalendar(this.calRef.current, {
      defaultView: 'month',
      taskView: true,
      useCreationPopup: true,
      useDetailPopup: true,
      timezones: [{
        timezoneOffset: 480,
        displayLabel: 'GMT+08:00',
        tooltip: 'Hong Kong',
      }],
    });
    this.calendar.on('beforeCreateSchedule', this.handleCreateSchedule);
    this.calendar.on('beforeUpdateSchedule', this.handleUpdateSchedule);
    this.calendar.on('beforeDeleteSchedule', this.handleDeleteSchedule);
  }

  public async initCalendarData() {
    const { dispatch } = this.props;
    const calendars = await calendarService.getAllCalendars();
    dispatch(setCalendar(calendars));
  }

  @Bind
  public handleCreateSchedule(event) {
    const calendar = this.props.calendars.find((c) => c.id === event.calendarId);
    if (!calendar) {
      return;
    }
    const scheduleProps = {
      category: 'time',
      id: shortId.generate(),
      borderColor: calendar.borderColor,
      bgColor: calendar.bgColor,
      dragBgColor: calendar.bgColor,
    };
    this.calendar.createSchedules([
      Object.assign(event, scheduleProps),
    ]);
  }

  @Bind
  public handleUpdateSchedule({schedule, start, end, calendar}) {
    Object.assign(schedule, {start, end});
    this.calendar.updateSchedule(schedule.id, schedule.calendarId, schedule);
  }

  @Bind
  public handleDeleteSchedule({schedule}) {
    this.calendar.deleteSchedule(schedule.id, schedule.calendarId);
  }

  @Bind
  public prevAction() {
    this.calendar.prev();
  }

  @Bind
  public nextAction() {
    this.calendar.next();
  }

  public render() {
    return <>
      <ButtonBar />
      <div ref={this.calRef} style={{height: 800}}/>
    </>;
  }
}

function mapStateToProps({calendar}): ICalendarState {
  return calendar;
}

export default connect(mapStateToProps)(Calendar);

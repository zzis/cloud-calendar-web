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
import { addCalendar } from '@/actions/calendar.action';

import { actions, ICalendarState } from '@/models/calendar.model';
import { IUmiComponentProps } from '@/common/types/umi.type';
import style from './index.less';

export interface ICalendarComponentProps {}

export interface ICalendarComponentState {
  schedules: any[];
}

type CalendarProps = IUmiComponentProps & ICalendarComponentProps & ReturnType<typeof mapStateToProps>;

@connect(({ calendar }) => (
  calendar
))
class Calendar extends React.Component<CalendarProps, ICalendarComponentState> {

  private calRef: any = React.createRef();
  private calendar;
  private color = '#9e5fff';

  constructor(props, context) {
    super(props);
    this.state = {
      schedules: [],
    };
  }

  public componentWillReceiveProps(nextProps) {
    const { calendars } = nextProps;
    this.calendar.setCalendars(nextProps.calendars);
    calendars.forEach((calendar) => {
      const { schedules } = calendar;
      schedules.forEach((schedule) => {
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

  public componentDidMount() {
    this.calendar = new BaseCalendar(this.calRef.current, {
      defaultView: 'month',
      taskView: true,
      useCreationPopup: true,
      useDetailPopup: true,
      timezones: [{
        timezoneOffset: 420,
        displayLabel: 'GMT+08:00',
        tooltip: 'Hong Kong',
      }],
    });
    this.calendar.setCalendars([{
      id: '1',
      name: 'Private',
      bgColor: this.color,
      borderColor: this.color,
    }]);
    // this.calendar.createSchedules([{
    //   id: '1',
    //   calendarId: '1',
    //   title: 'my schedule',
    //   category: 'time',
    //   dueDateClass: '',
    //   bgColor: '#9e5fff',
    //   start: '2019-07-22T22:30:00+09:00',
    //   end: '2019-07-22T02:30:00+09:00',
    // }]);
    this.calendar.on('beforeCreateSchedule', this.handleCreateSchedule);
    this.calendar.on('beforeUpdateSchedule', this.handleUpdateSchedule);
    this.calendar.on('beforeDeleteSchedule', this.handleDeleteSchedule);
    this.initCalendar();
  }

  public async initCalendar() {
    const { dispatch } = this.props;
    const calendars = await calendarService.getAllCalendars();
    dispatch(addCalendar(calendars));
  }

  @Bind
  public handleCreateSchedule(event) {
    const scheduleProps = {
      category: 'time',
      id: shortId.generate(),
      borderColor: this.color,
      bgColor: this.color,
      dragBgColor: this.color,
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

  public render() {
    return <div ref={this.calRef} style={{height: 800}}/>;
  }
}

function mapStateToProps({calendar}): ICalendarState {
  return calendar;
}

export default connect(mapStateToProps)(Calendar);

import React, { Fragment } from 'react';
import TuiCalendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import { Button } from 'antd';

import style from './index.less';

export interface ICalendarProps {}
export interface ICalendarState {}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
  public render() {
    const today = new Date();
    const calendars = [
      {
        id: '0',
        name: 'Private',
        bgColor: '#9e5fff',
        borderColor: '#9e5fff',
      },
      {
        id: '1',
        name: 'Company',
        bgColor: '#00a9ff',
        borderColor: '#00a9ff',
      },
    ];
    const timeZones = [
      {
        timezoneOffset: 480,
        displayLabel: 'GMT+08:00',
        tooltip: 'Beijing',
      },
    ];
    return <div className={style.calendarContainer}>
      <TuiCalendar
        view={'month'}
        height={500}
        useCreationPopup
      />
    </div>;
  }
}

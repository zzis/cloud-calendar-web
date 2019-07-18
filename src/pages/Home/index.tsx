import React, { Fragment } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import style from './index.less';

export default class Home extends React.Component {
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
    return <div id={'calendar'} className={style.calendarContainer}>
      <Calendar
        view={'month'}
        height={500}
      />
    </div>;
  }
}

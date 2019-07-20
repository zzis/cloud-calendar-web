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
  private calendarRef: any = React.createRef();
  private calendarInstance;

  public componentDidMount() {
    this.calendarInstance = this.calendarRef.current.getInstance();
  }

  public render() {
    return <div className={style.calendarContainer}>
      <TuiCalendar
        view={'month'}
        height={500}
        useCreationPopup
        ref={this.calendarRef}
      />
    </div>;
  }
}

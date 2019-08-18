import { useState } from 'react';
import { Button, Dropdown, Menu, Select } from 'antd';
import { ICalendarState } from '@/models/calendar.model';
import { setCurrentDate, setCalendarMode } from '@/actions/calendar.action';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { CalendarMode } from '@/models/calendar.model';
import style from '../index.less';

export const CALENDAR_MODE_MAP = {
  month: 'month',
  week: 'week',
  day: 'day',
};

export default function ButtonBar() {

  const dispatch = useDispatch();
  const calendar: ICalendarState = useSelector((state: any) => state.calendar);
  let containerRef = null;

  const moveToPrevPeriod = () => {
    const { stepLength, mode } = getMoveStepLength();
    dispatch(setCurrentDate(calendar.currentDate.subtract(stepLength as any, mode)));
  };

  const moveToNextPeriod = () => {
    const { stepLength, mode } = getMoveStepLength();
    dispatch(setCurrentDate(calendar.currentDate.add(stepLength as any, mode)));
  };

  const getMoveStepLength = () => {
    switch (calendar.calendarMode) {
      case CalendarMode.day:
      case CalendarMode.week:
      case CalendarMode.month:
        return {
          stepLength: 1,
          mode: CALENDAR_MODE_MAP[calendar.calendarMode],
        };
      case CalendarMode.twoWeeks:
        return {
          stepLength: 2,
          mode: CALENDAR_MODE_MAP[CalendarMode.week],
        };
    }
  };

  const moveBackToToday = () => {
    dispatch(setCurrentDate(moment()));
  };

  const handleCalendarChange = (value) => {
    dispatch(setCalendarMode(CalendarMode[`${value}`]));
  };

  const setContainerRef = (ele) => {
    containerRef = ele;
  };

  const getContainerRef = () => {
    return containerRef;
  };

  return (
    <div className={style.ButtonBar} ref={setContainerRef}>
      <Select
        defaultValue={calendar.calendarMode.toString()}
        onChange={handleCalendarChange}
        className={style.modeSelect}
        getPopupContainer={getContainerRef}
      >
        {
          Object.values(CalendarMode).map((mode) => (
            <Select.Option key={mode} className={style.modeSelectOption}>{mode}</Select.Option>
          ))
        }
      </Select>
      <Button onClick={moveBackToToday} className={style.buttonItem}>Today</Button>
      <Button icon="left" shape="circle" onClick={moveToPrevPeriod} className={style.buttonItem}></Button>
      <Button icon="right" shape="circle" onClick={moveToNextPeriod} className={style.buttonItem}></Button>
      <span className={style.currentDate}>
        { calendar.currentDate.format('YYYY-MM-DD') }
      </span>
    </div>
  );
}

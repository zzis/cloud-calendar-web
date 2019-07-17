import React, { Fragment } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import moment from 'moment';

export default class Home extends React.Component {
  public render() {
    const today = new Date();
    return <Fragment>
      <Calendar
        height='900px'
        calendars={[
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
        ]}
        disableDblClick={true}
        disableClick={false}
        isReadOnly={false}
        month={{
          startDayOfWeek: 0,
        }}
        // schedules={[
        //   {
        //     id: '1',
        //     calendarId: '0',
        //     title: 'TOAST UI Calendar Study',
        //     category: 'time',
        //     dueDateClass: '',
        //     start: today.toISOString(),
        //     end: moment,
        //   },
        //   {
        //     id: '2',
        //     calendarId: '0',
        //     title: 'Practice',
        //     category: 'milestone',
        //     dueDateClass: '',
        //     start: today.toISOString(),
        //     end: today.toISOString(),
        //     isReadOnly: true,
        //   },
        //   {
        //     id: '3',
        //     calendarId: '0',
        //     title: 'FE Workshop',
        //     category: 'allday',
        //     dueDateClass: '',
        //     start: today.toISOString(),
        //     end: today.toISOString(),
        //     isReadOnly: true,
        //   },
        //   {
        //     id: '4',
        //     calendarId: '0',
        //     title: 'Report',
        //     category: 'time',
        //     dueDateClass: '',
        //     start: today.toISOString(),
        //     end: today.toISOString(),
        //   },
        // ]}
        scheduleView
        taskView
        template={{
          milestone(schedule) {
            return `<span style="color:#fff;background-color: ${schedule.bgColor};">${
              schedule.title
            }</span>`;
          },
          milestoneTitle() {
            return 'Milestone';
          },
          allday(schedule) {
            return `${schedule.title}<i class="fa fa-refresh"></i>`;
          },
          alldayTitle() {
            return 'All Day';
          },
        }}
        timezones={[
          {
            timezoneOffset: 540,
            displayLabel: 'GMT+09:00',
            tooltip: 'Seoul',
          },
          {
            timezoneOffset: -420,
            displayLabel: 'GMT-08:00',
            tooltip: 'Los Angeles',
          },
        ]}
        useDetailPopup
        useCreationPopup
        defaultView
        week={{
          showTimezoneCollapseButton: true,
          timezonesCollapsed: true,
        }}
      />
    </Fragment>;
  }
}

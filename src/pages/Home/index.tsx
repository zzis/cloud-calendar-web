import React, { Fragment } from 'react';
import Calendar from '@/components/Calendar/index';
import Uploader from '@/components/uploader/index';

import style from './index.less';

export default class Home extends React.Component {
  public render() {
    return <>
      <Calendar />
      <Uploader />
    </>;
  }
}

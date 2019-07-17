import React from 'react';

import style from './index.less';

interface IHeaderState {}
interface IHeaderProps {}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  public render() {
    return (
      <header className={style.header}>
        <span className={style.logoText}>Cloud Calendar</span>
      </header>
    );
  }
}

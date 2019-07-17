import React from 'react';

import style from './index.less';
import logo from '@/assets/facebook_cover_photo_1.png';

interface IHeaderState {}
interface IHeaderProps {}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  public render() {
    return (
      <header className={style.header}>
        {/* <img src={logo} alt='cloud calendar' className={style.logo}/> */}
        <span className={style.logoText}>Cloud Calendar</span>
      </header>
    );
  }
}

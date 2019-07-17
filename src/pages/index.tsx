import React, { Fragment } from 'react';

import Header from '@/components/Header/index';
import Home from './Home/index';

interface IAppState {}
interface IAppProps {}

export default class App extends React.Component<IAppProps, IAppState> {
  public render() {
    return (
      <Fragment>
        <Header />
        <Home />
      </Fragment>
    );
  }
}

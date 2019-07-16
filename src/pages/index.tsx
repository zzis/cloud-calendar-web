import React, { Fragment } from 'react';

import Header from '@/components/header/index';

interface IAppState {}
interface IAppProps {}

export default class App extends React.Component<IAppProps, IAppState> {
  public render() {
    return (
      <Fragment>
        <Header />
      </Fragment>
    );
  }
}

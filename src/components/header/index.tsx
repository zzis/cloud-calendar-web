import React from 'react';

interface IHeaderState {}
interface IHeaderProps {}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  public render() {
    return (
      <div>Header</div>
    );
  }
}

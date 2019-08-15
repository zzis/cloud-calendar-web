import React from 'react';
import { Row, Col, Radio } from 'antd';
import StatisticModel from './models/statistic.model';
import { Bind } from 'lodash-decorators';

export default class Statistic extends React.Component {

  private statisticModel: StatisticModel = null;

  constructor(props, context) {
    super(props);
    this.statisticModel = new StatisticModel();
  }

  @Bind
  public handleDateTypeChange(e) {
    this.statisticModel.selectedDateType = e.target.value;
    this.forceUpdate();
  }

  public render() {
    return (
      <div>
        <Row>
          <Radio.Group onChange={this.handleDateTypeChange}>
            {
              Object.keys(this.statisticModel.DATE_TYPE_LIST).map((type) => {
                return <Radio.Button value={type}>
                  {this.statisticModel.DATE_TYPE_LIST[type]}
                </Radio.Button>;
              })
            }
          </Radio.Group>
        </Row>
        <Row>
          <Col span={12}>pan diagram</Col>
          <Col span={12}>event list</Col>
        </Row>
      </div>
    );
  }
}

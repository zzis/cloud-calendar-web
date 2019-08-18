import React from 'react';
import { Row, Col, Radio } from 'antd';
import StatisticModel, { ICategoryTimeSpendInM, IFiteredCategoryByPeriod } from './models/statistic.model';
import { Bind } from 'lodash-decorators';
import { connect } from 'dva';
import { IUmiComponentProps } from '@/common/types/umi.type';
import { ICalendarState } from '@/models/calendar.model';
import EventList from './hooks/EventList';
import TimeStatisticChart from './hooks/TimeStatisticChart';
import style from './index.less';

interface IStatisticState {
  categoryTimeSpent: ICategoryTimeSpendInM;
  categoryInPeriod: IFiteredCategoryByPeriod;
}
interface IStatisticProps {}

type StatisticProps = IStatisticProps & ReturnType<typeof mapToProps> & IUmiComponentProps;

class Statistic extends React.Component<StatisticProps, IStatisticState> {

  private statisticModel: StatisticModel = null;

  constructor(props: StatisticProps, context) {
    super(props);
    this.statisticModel = new StatisticModel();
    this.state = {
      categoryTimeSpent: {},
      categoryInPeriod: {}
    };
  }

  componentWillReceiveProps(nextProps: StatisticProps) {
    this.statisticModel.setCalendars(nextProps.calendars);
  }

  @Bind
  public handleDateTypeChange(e) {
    this.statisticModel.selectedDateType = e.target.value;
    const { calendars, currentDate } = this.props;
    const categoryInPeriod = this.statisticModel.getCategoryInPeriod(calendars, currentDate, e.target.value);
    const categoryTimeSpent = this.statisticModel.getCategoryTimeSpent(categoryInPeriod);
    this.setState({
      categoryTimeSpent,
      categoryInPeriod
    });
  }

  public render() {
    return (
      <div className={style.statistic}>
        <Row className={style.title}>
          <Radio.Group onChange={this.handleDateTypeChange} defaultValue={'day'}>
            {
              Object.keys(this.statisticModel.DATE_TYPE_LIST).map((type) => {
                return <Radio.Button value={type} key={type}>
                  {this.statisticModel.DATE_TYPE_LIST[type]}
                </Radio.Button>;
              })
            }
          </Radio.Group>
        </Row>
        <Row>
          <Col span={12}>
            <TimeStatisticChart categoryTimeSpent={this.state.categoryTimeSpent}/>
          </Col>
          <Col span={12}>
            <EventList
              categoryInPeriod={this.state.categoryInPeriod}
              statisticModel={this.statisticModel}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapToProps({calendar}): ICalendarState {
  return calendar;
}

export default connect(mapToProps)(Statistic);

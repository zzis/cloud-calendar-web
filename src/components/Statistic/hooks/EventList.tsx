import StatisticModel, { IFiteredCategoryByPeriod } from "../models/statistic.model";
import { List } from "antd";

interface IEventListProps {
  categoryInPeriod: IFiteredCategoryByPeriod;
  statisticModel: StatisticModel;
}

export default function EventList(props: IEventListProps) {
  const { categoryInPeriod, statisticModel } = props;
  const categoryListData = statisticModel.getCategoryListData(categoryInPeriod);
  return <div>
    {
      Object.keys(categoryListData).map((category) => {
        if (!categoryListData[category].length) {
          return;
        }
        return <div>
          <h1>
            {category}
          </h1>
          <List
            dataSource={categoryListData[category]}
            renderItem={item => <List.Item>{item.title} {(item.timeSpentInM / 60).toFixed(2)}小时</List.Item>}
          />
        </div>;
      })
    }
  </div>;
};

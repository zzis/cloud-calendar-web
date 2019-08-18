import { ICategoryTimeSpendInM } from "../models/statistic.model";
import 'tui-chart/dist/tui-chart.css';
import { PieChart } from '@toast-ui/react-chart';

interface ITimeStatisticChartProps {
  categoryTimeSpent: ICategoryTimeSpendInM;
}

export default function TimeStatisticChart(props: ITimeStatisticChartProps) {
  const { categoryTimeSpent } = props;
  const data = {
    categories: ['Calendar'],
    series: []
  };
  const options = {
    chart: {
      width: 300,
      height: 300,
    },
    series: {
      showLabel: true,
      showLegend: true,
      labelAlign: 'outer'
    },
    legend: {
      visible: false
    }
  };
  if (!Object.values(categoryTimeSpent).some((timeSpent) => timeSpent > 0)) {
    data.series.push({
      name: 'default',
      data: 0
    });
  }
  for (const category in props.categoryTimeSpent) {
    data.series.push({name: category, data: Number((props.categoryTimeSpent[category] / 60).toFixed(2))});
  }
  
  return <div>
    <PieChart
      data={data}
      options={options}
    />
  </div>;
}
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';

const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const today = new Date()
const currentMonth = today.getMonth()
const monthLabel = monthsName.slice(0, currentMonth + 1)

export default function BarChart(props) {

    const data = {
        labels: monthLabel,
        datasets: [
            {
                label: 'Count',
                backgroundColor: 'rgba(19, 88, 167, 0.22)',
                borderColor: 'rgba(19, 88, 167, 0.4)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(19, 88, 182, 0.62)',
                hoverBorderColor: 'rgba(19, 88, 167, 0.4)',
                data: props.chartData,
            }
        ]
    };

    return (
        <div>
            <Bar
                data={data}
                width={100}
                height={50}
            />
        </div>
    );
}

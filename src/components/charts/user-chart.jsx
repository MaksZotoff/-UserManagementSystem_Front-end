import React from 'react'
import Chart from 'react-apexcharts'

    const chartOptions = {
        series: [{
            name: 'Выполнено общих задач',
            data: [9, 11, 10, 10, 16, 14, 9, 13, 13, 15, 18, 16]
        }],
        options: {
            color: ['#6ab04c', '#2980b9'],
            chart: {
                background: 'transparent'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
            },
            legend: {
                position: 'top'
            },
            grid: {
                show: false
            }
        }
    }

const UserChart = props => {
    return (
        <div className="chart">
            <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type='line'
                height='100%'
            />
        </div>
    )
}

export default UserChart
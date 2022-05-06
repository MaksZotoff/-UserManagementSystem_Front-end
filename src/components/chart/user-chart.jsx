import React from 'react'
import Chart from 'react-apexcharts'

    const chartOptions = {
        series: [{
            name: 'Выполнено задач',
            data: [30, 27, 41, 33, 20, 29, 43, 42, 48, 24, 37, 37]
        }, {
            name: 'Запланировано задач',
            data: [32, 30, 41, 35, 26, 29, 52, 42, 48, 56, 42, 37]
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
                categories: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сент', 'Окт', 'Ноя', 'Дек']
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
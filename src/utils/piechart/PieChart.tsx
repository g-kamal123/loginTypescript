import { Card, DoughnutCharts } from '@cedcommerce/ounce-ui'
import React, { FC } from 'react'
import { countobj } from '../../components/Graphs/Doughnut/Doughnut'
interface IProps{
  apiData:countobj[]
}
const PieChart:FC<IProps> = ({apiData}) => {
  return (
    <div>
    <Card>
    <DoughnutCharts
      data={{
        datasets: [
          {
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ].slice(apiData.length),
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ].slice(apiData.length),
            borderWidth: 1,
            data: apiData.map((item)=>item.total)
          }
        ],
        labels: apiData.map((item)=>item._id)
      }}
     />
  </Card>
  </div>
  )
}

export default PieChart
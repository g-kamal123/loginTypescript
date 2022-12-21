import { Card, LineCharts } from '@cedcommerce/ounce-ui'
import React, { FC } from 'react'
import { Datasets } from '../../components/Graphs/calendergraph/CalenderGraph'
interface LinechartProps{
  graphData:Datasets[]
}
const Linechart:FC<LinechartProps> = ({graphData}) => {
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
    <Card>
  <LineCharts
    data={{
      datasets: graphData.map((item)=>{
          return {
            backgroundColor: getRandomColor(),
            borderColor:getRandomColor(),
            data:item.data,
            label:item.label
          }
        })
      ,
      labels: graphData[0]?.labels
    }}
    options={{
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart'
        }
      },
      responsive: true
    }}
  />
</Card>
  )
}

export default Linechart
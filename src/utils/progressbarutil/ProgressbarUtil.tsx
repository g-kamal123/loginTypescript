import { Card, Progressbar } from '@cedcommerce/ounce-ui'
import React, { FC } from 'react'
interface PercProps{
    perc:number
}
const ProgressbarUtil:FC<PercProps> = ({perc}) => {
  return (
    <Card title="Progress Bar">
    <Progressbar
      message="PB"
      percentage={perc}
      progessThickness="none"
    />
  </Card>
  )
}

export default ProgressbarUtil
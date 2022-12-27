import { Card, FlexChild, FlexLayout } from '@cedcommerce/ounce-ui'
import React from 'react'
import CalenderGraph from './calendergraph/CalenderGraph'
import Doughnut from './Doughnut/Doughnut'
import ProgressGraph from './progressbar/ProgressGraph'

const Graph = () => {
  return (
    <>
   <FlexLayout>
    <FlexChild desktopWidth='50' tabWidth='50'>
      <FlexLayout halign='center' valign='center'>
   <Doughnut />
   </FlexLayout>
   </FlexChild>
   <FlexChild desktopWidth='50' tabWidth='50'>
   <ProgressGraph />
   </FlexChild>
   </FlexLayout>
   <Card>
   <FlexLayout halign='center'>
    <FlexChild desktopWidth='66' tabWidth='66'>
    <CalenderGraph />
    </FlexChild>
   </FlexLayout>
   </Card>
   </>
  )
}

export default Graph
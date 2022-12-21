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
   <Doughnut />
   </FlexChild>
   <FlexChild desktopWidth='50' tabWidth='50'>
   <ProgressGraph />

   </FlexChild>
   </FlexLayout>
   <Card>
    <CalenderGraph />
   </Card>
   </>
  )
}

export default Graph
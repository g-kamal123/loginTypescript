import React, { useEffect, useState } from 'react'
import { useFetch } from '../../../utils/fetchHook/FetchHook'
import ProgressbarUtil from '../../../utils/progressbarutil/ProgressbarUtil'

const ProgressGraph = () => {
  const [flag,setFlag] = useState<boolean>(false);
  const [perc,setPerc] = useState<number>(0)
  const [apiCall] = useFetch("https://multi-account.sellernext.com/home/public/connector/get/allQueuedTasks")
  const getData =async()=>{
    let payload ={
      "target_marketplace": "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      "source": {
          "shopId": "889",
          "marketplace": "shopify"
      },
      "target": {
          "shopId": "890",
          "marketplace": "twitter"
      }
  }
    const ftch = await apiCall._post({...payload})
    const dt = await ftch.data
    if(dt.rows.length>0)
    setFlag(!flag);
    let percentage:number = dt.rows[0]? dt.rows[0].progress : perc
    setPerc(percentage);
  }
  let interval:any;
  const callApi =()=>{
    interval = setInterval(()=>{
      getData()
    },2000)
  }
  useEffect(()=>{
    callApi()
    return()=>{
      clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
    <ProgressbarUtil perc={perc}/>
    </>
  )
}

export default ProgressGraph
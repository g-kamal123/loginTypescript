import React, { FC, useEffect, useState } from 'react'
import { useFetch } from '../../../utils/fetchHook/FetchHook'
import PieChart from '../../../utils/piechart/PieChart'

export type countobj = {
    _id:string,
    total:number
}

const Doughnut:FC = () => {
    const [apiData,setApiData] = useState<countobj[]>([]);
    const [apiCall] = useFetch("https://multi-account.sellernext.com/home/public/connector/product/getStatusWiseCount")
    const getData = async()=>{
        let payload = {
            "target_marketplace": "twitter",
            "source": {
                "shopId": "889",
                "marketplace": "shopify"
            },
            "target": {
                "shopId": "890",
                "marketplace": "twitter"
            },
            "productOnly": true
        }
        const ftch = await apiCall._post({...payload})
        const dt = ftch.data
        setApiData([...dt])
    }
    useEffect(()=>{
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <>
    <PieChart apiData={apiData}/>
    </>
  )
}

export default Doughnut
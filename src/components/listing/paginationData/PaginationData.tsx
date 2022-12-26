import { Pagination } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPagination } from '../../../store/slices/GridSlice';
import { RootState } from '../../../store/Store';
import { useFetch } from '../../../utils/fetchHook/FetchHook'
import { filters } from '../../../utils/filters/Filters';
import { getProductHeader } from '../../../utils/headers/Headers';

const PaginationData = () => {
    const store = useSelector((state:RootState)=>state.grid);
    const dispatch = useDispatch();
    const [apiCall] = useFetch("https://multi-account.sellernext.com/home/public/connector/product/getRefineProductCount");
    const [totalCount,setTotalCount] = useState<number>(0)

    const getData =async()=>{
        let filter = filters()
    let payload = {
      ...filter,
      productOnly: true,
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    };
    const ftch = await apiCall._get({ ...payload }, getProductHeader);
    const dt = ftch.data
    setTotalCount(dt.count)
    }
    useEffect(()=>{
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.api])
    const perPageCountHandler =(e:number)=>{
        dispatch(setPagination({type:"perPage",countPerPage:e}));
    }
    const nextPageHandler =()=>{
        dispatch(setPagination({type:"nextPage"}));
    }
    const prevPageHandler =()=>{
        dispatch(setPagination({type:"prevPage"}));
    }
  return (
    <Pagination
    countPerPage={store.pageCount}
    currentPage={store.activePage}
    onCountChange={perPageCountHandler}
    onEnter={function noRefCheck(){}}
    onNext={nextPageHandler}
    onPrevious={prevPageHandler}
    optionPerPage={[
      {
        label: '10',
        value: '10'
      },
      {
        label: '20',
        value: '20'
      },
      {
        label: '50',
        value: '50'
      }
    ]}
    totalitem={totalCount}
  />
  )
}

export default PaginationData
import { Filter, Select } from '@cedcommerce/ounce-ui'
import {Filter as FIlterIcon} from "react-feather"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/Store'
import { setAppliedStatus, setStatus } from '../../../store/slices/GridSlice'

// type optiontype ={
//     label:string,
//     value:string
// }
export const DrawFilter = () => {
    const store = useSelector((state:RootState)=>state.grid);
    const dispatch = useDispatch();
    const selectHandler =(e:string)=>{
        dispatch(setStatus({
            status:e
        }))
    }
    const applyFilter = ()=>{
        dispatch(setAppliedStatus())
    }
  return (
    <>
    <Filter
      button="More Filters"
      disableApply={false}
      filters={[
        {
          children: <Select options={[{label: 'Uploaded', value: 'Uploaded'}, {label: 'Error', value: 'Error'},{label: 'In Progress', value: 'In Progress'},{label: 'Not Listed', value: 'Not Listed'}]} thickness="thin"
          value={store.selectedStatus}
          onChange={selectHandler}/>,
          name: 'Product Status'
        },
      ]}
      heading="Filter Heading"
      icon={<FIlterIcon color="#2a2a2a" size={16}/>}
      onApply={applyFilter}
    //   onClose={function noRefCheck(){}}
      type="Outlined"
    />
  </>
  )
}

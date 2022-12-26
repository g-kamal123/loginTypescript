import { Button, CheckBox, FlexLayout } from '@cedcommerce/ounce-ui'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRows } from '../../../store/slices/GridSlice'
import { RootState } from '../../../store/Store'
import classes from './removeSelect.module.css'

const RemoveSelect = () => {
  const store = useSelector((state:RootState)=>state.grid);
  const dispatch = useDispatch();
  const checkboxHandler =()=>{
    let allkeys:string[] = []
    let sel:boolean = true
    if(!store.selected){
    allkeys = store.listData.map((item)=>item.key)
    sel = false
    }
    dispatch(selectRows({
      keys:allkeys,
      sel
    }))
  }
  const removeHandler =()=>{
    dispatch(selectRows({
      keys:[],
      sel:true
    }))
  }
  return (
    <div className={classes.remove__select}>
    <FlexLayout valign='center' spacing='loose'>
    <CheckBox
    checked={store.selected}
      // description="Checkbox Descripion"
      id="two"
      labelVal="Selected"
      name="Name"
      onClick={checkboxHandler}
    />
    <Button onClick={removeHandler} icon={
    <i className="fa-solid fa-xmark"></i>
     }
     type="Outlined" />
  </FlexLayout>
  </div>
  )
}

export default RemoveSelect
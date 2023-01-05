import { Button, FlexLayout, TextStyles } from "@cedcommerce/ounce-ui";
import React, { FC, useState } from "react";
import { Plus, XSquare } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup, rowTypes, setRowNum } from "../../../store/slices/QuerySlice";
import { RootState } from "../../../store/Store";
import SelectRow from "../selectRow/SelectRow";
import {v4 as uuid} from 'uuid';
type FProps ={
  allrows:rowTypes[]
}
const FilterGroup: FC<FProps> = (props) => {
  const store = useSelector((state: RootState) => state.query);
  // console.log(store)
  const [rowCount,setRowCount] = useState<string[]>(["first"])
  const dispatch = useDispatch();
  const btnHandler = () => {
    dispatch(setRowNum({
      data:props.allrows,
      key:props.allrows[0].group
    }));
    // setRowCount(prev=>prev+1)
    setRowCount([...rowCount,uuid()])
  };
  const groupHandler = ()=>{
    let group = props.allrows[0].group
    dispatch(deleteGroup({
      group
    }))
  }
  return (
    <>
      <FlexLayout valign="center" halign="fill">
        <FlexLayout halign="start" valign="center">
          {Object.keys(store.dataStructure).length>1 &&
        <Button icon={<XSquare size={18}/>} type="Plain" onClick={groupHandler}/>
      }
        <TextStyles>Filter Group</TextStyles>
        </FlexLayout>
        <Button type="Plain" onClick={btnHandler} icon={<Plus size={18} />} >Add Row</Button>
      </FlexLayout>
      <FlexLayout direction="vertical" spacing="loose">
      {props.allrows
        .map((item:any,key) => (
          <SelectRow key={item} rowValue={item} rowCount={props.allrows.length} />
        ))}
        </FlexLayout>
    </>
  );
};

export default FilterGroup;

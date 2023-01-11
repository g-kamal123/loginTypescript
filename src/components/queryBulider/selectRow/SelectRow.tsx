import {
  ChoiceList,
  FlexChild,
  FlexLayout,
  Select,
  TextField,
} from "@cedcommerce/ounce-ui";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRow,
  rowTypes,
  updateRow,
} from "../../../store/slices/QuerySlice";
import { RootState } from "../../../store/Store";

type IProps = {
  rowValue: rowTypes;
  rowCount: number;
};
const SelectRow: FC<IProps> = (props) => {
  const store = useSelector((state: RootState) => state.query);
  const [filterChoice,setFilterChoice] = useState<any>([])
  const dispatch = useDispatch();

  useEffect(()=>{
    let toFilter:any = []
    if(store.dataStructure){
    Object.keys(store.dataStructure).map((item)=>{
      store.dataStructure[item].map((it)=>{
        if(it.inputType==="choiceList"){
          toFilter = [...toFilter,...it.input]
          toFilter = [...new Set(toFilter)]
        }
        return 0
      })
      return 0
    })}
    setFilterChoice([...toFilter])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[store.dataStructure])
  const categorySelectChangeHandler = (e: string) => {
    let data: any = JSON.parse(e);
    // setConstraintSelect([...data.constraint]);
    let rowData = { ...props.rowValue };
    rowData.inputType = "TextField";
    if (data.title === "Brand" || data.title === "Product Type")
      rowData.inputType = "choiceList";
    if (data.title === "Product status") rowData.inputType = "select";
    if (data.options.length) rowData.options = [...data.options];

    dispatch(
      updateRow({
        value: e,
        id: rowData.id,
        group: rowData.group,
        key: "category",
        inputType: rowData.inputType,
        options: rowData.options,
        constraintOption:[...data.constraint]
      })
    );
  };
  const constraintSelectChangeHandler = (e: string) => {
    let rowData = { ...props.rowValue };
    dispatch(
      updateRow({
        value: e,
        id: rowData.id,
        group: rowData.group,
        key: "constraint",
      })
    );
  };
  const inputSelectChangeHandler = (e: string) => {
    let rowData = { ...props.rowValue };
    dispatch(
      updateRow({
        value: e,
        id: rowData.id,
        group: rowData.group,
        key: "input",
      })
    );
  };
  const deleteHandler = () => {
    let rowData = { ...props.rowValue };
    dispatch(
      deleteRow({
        id: rowData.id,
        group: rowData.group,
      })
    );
  };
  const choiceListHandler = (e: string) => {
    let rowData = { ...props.rowValue };
    let temp = [...rowData.input].filter((item)=>item===e)
    let value:any =[]
    if(!temp.length)
    value = [...rowData.input, e]
    if(temp.length)
    value = [...rowData.input].filter((item)=>item!==e)
    dispatch(
      updateRow({
        value,
        id: rowData.id,
        group: rowData.group,
        key: "input",
      })
    );
  };
  return (
    <>
      <FlexLayout halign="fill" spacing="loose">
        <FlexChild desktopWidth="33" tabWidth="33">
        <Select
          options={store.rows}
          onChange={categorySelectChangeHandler}
          value={props.rowValue.category}
        />
        </FlexChild>
        <FlexChild tabWidth="33" desktopWidth="33">
        <Select
          options={props.rowValue.constraintOption}
          onChange={constraintSelectChangeHandler}
          value={props.rowValue.constraint}
        />
        </FlexChild>
        {props.rowValue.inputType === "TextField" && (
          <FlexChild desktopWidth="33" tabWidth="33">
          <TextField
          type={(JSON.parse(props.rowValue.category).title==="Price"||JSON.parse(props.rowValue.category).title==="Quantity")?"number":"text"}
            onChange={inputSelectChangeHandler}
            value={
              Array.isArray(props.rowValue.input) ? "" : props.rowValue.input
            }
          />
          </FlexChild>
        )}
        {props.rowValue.inputType === "select" && (
          <FlexChild desktopWidth="33" tabWidth="33">
          <Select
            options={props.rowValue.options}
            onChange={inputSelectChangeHandler}
            value={
              Array.isArray(props.rowValue.input) ? "" : props.rowValue.input
            }
          />
          </FlexChild>
        )}
        {props.rowValue.inputType === "choiceList" && (
          <FlexChild desktopWidth="33" tabWidth="33">
          <ChoiceList
          showBadges={true}
            options={props.rowValue.options.filter((item:any)=>!filterChoice.includes(item.value))}
            value={
              Array.isArray(props.rowValue.input)
                ? [...props.rowValue.input]
                : []
            }
            onChange={choiceListHandler}
            placeholder={props.rowValue.input.length>0
              ? ""
              : "Select"}
          />
          </FlexChild>
        )}
      </FlexLayout>
      <br />
      {props.rowCount > 1 && (
        <FlexLayout halign="end">
          <a href="#d" onClick={deleteHandler}>
            Delete
          </a>
        </FlexLayout>
      )}
    </>
  );
};

export default SelectRow;

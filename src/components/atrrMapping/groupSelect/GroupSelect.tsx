import { FlexLayout, Select, TextField } from "@cedcommerce/ounce-ui";
import React, { FC, useState } from "react";
interface IProps {
  opts: string[];
  add?: string;
  val?: string;
  selectHandler?: (e: string, val: number | undefined) => void;
  delHandler?: (val: number | undefined) => void;
  index?: number;
  selValue?: string;
}
const GroupSelect: FC<IProps> = (props) => {
  // console.log(props)
  const [selected, setSelected] = useState<string>();
  const [customInput, setCustomInput] = useState<boolean>();
  const selectChangeHandler = (e: string, val: number | undefined) => {
    if (e === "Set Custom") {
      setCustomInput(true);
    }
    else
    setCustomInput(false)
    props?.selectHandler?.(e, val);
    setSelected(e);
  };
  const deleteHandler = (val: number | undefined) => {
    // let data = props.opts.map((item,key)=>item===selected)
    let data = -1;
    Object.keys(props.opts).map((item: any) => {
      if (props.opts[item] === selected) data = item;
      return 0;
    });
    // setSelected(props.opts[data-1])
    console.log(data);
    props.delHandler?.(val);
  };
  const inputHandler =(e: string, val: number | undefined)=>{

  }
  return (
    <FlexLayout direction="vertical" spacing="loose">
      <Select
        // dropDownheight={200}
        searchEable
        //   name="Name"
        onChange={(e: string) => selectChangeHandler(e, props.index)}
        options={props.opts.map((item: string) => {
          return { label: item, value: item };
        })}
        placeholder="Select"
        popoverContainer="body"
        //   selectHelp="Write help text here"
        thickness="thick"
        value={props.selValue || selected}
      />
      {props.add && (
        <a href="#a" onClick={() => deleteHandler(props.index)}>
          Delete
        </a>
      )}
      {customInput && <TextField onChange={(e:string)=>inputHandler(e,props.index)}/>}
    </FlexLayout>
  );
};

export default GroupSelect;

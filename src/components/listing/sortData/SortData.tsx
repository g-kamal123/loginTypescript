import { Card, Select } from "@cedcommerce/ounce-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../../store/slices/GridSlice";
import { RootState } from "../../../store/Store";

const SortData = () => {
    const store = useSelector((state:RootState)=>state.grid);
    const dispatch = useDispatch();
    const sortChangeHandler =(e:string)=>{
        dispatch(setSort({
            sort:e
        }))
    }
  return (
    <Card>
      <Select
        // dropDownheight={200}
        helpIcon={
          <svg
            fill="none"
            height="20"
            stroke="#c3c3c3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
          </svg>
        }
        labelInLine
        name="Sort-By:"
        onChange={sortChangeHandler}
        onblur={function noRefCheck() {}}
        options={[
            {label:"Title A-Z",value:"1"},
            {label:"Title Z-A",value:"-1"}
        ]}
        value={store.sort}
      />
    </Card>
  );
};

export default SortData;

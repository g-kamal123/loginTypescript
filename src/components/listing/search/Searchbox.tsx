import { FlexChild, FlexLayout, TextField } from "@cedcommerce/ounce-ui";
import React from "react";
import { Search } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { setEnteredInput, setSearchInput } from "../../../store/slices/GridSlice";
import { RootState } from "../../../store/Store";

const Searchbox = () => {
  const store = useSelector((state: RootState) => state.grid);
  const dispatch = useDispatch();
  const inputHandler = (e: string) => {
    dispatch(
      setSearchInput({
        input: e,
      })
    );
  };
  const enterClickHandler =() =>{
    if(store.searchTag)
    // dispatch(setApiCall())
    dispatch(setEnteredInput());

  }
  return (
    <div>
      <>
        <FlexLayout halign="start" valign="center">
          <FlexChild desktopWidth="50" mobileWidth="100" tabWidth="50">
            <TextField
              // name="Name"
              onChange={inputHandler}
              onEnter={enterClickHandler}
              placeHolder="Enter here"
              prefix={<Search size={18} />}
              type="text"
              value={store.searchTag}
            />
          </FlexChild>
        </FlexLayout>
      </>
    </div>
  );
};

export default Searchbox;

import { Box, Button, Inline, Stack, TextField } from "@shopify/polaris";
import React, { FC, useState } from "react";
import { MessageSquare, Send, X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { cancelComment, commentData, setChildComment, setParentComment } from "../../../store/slices/Comments";
import { RootState } from "../../../store/Store";

type cInput ={
    parentField?:string
    commentData?:commentData
}
const InputField:FC<cInput> = (props) => {
  const store = useSelector((state:RootState)=>state.comments)
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>("");
  const btnHandler = ()=>{
    if(store.user && value){
    if(props.parentField==="parent")
    dispatch(setParentComment({
        value
    }))
    else dispatch(setChildComment({
        value
    }))
    setValue("")
  }
  }
  const cancelHandler =()=>{
    dispatch(cancelComment({
      commentData:props.commentData
    }))
    setValue("")
  }
  return (
    <Box width="100%">
    <Inline>
      <div className="inputText" style={{width:"80%"}}> 
        <TextField
          name="comment"
          placeholder="Enter your comment"
          label=""
          autoComplete="off"
          maxHeight={4}
          multiline={true}
          prefix={<MessageSquare size={40} />}
          value={value}
          type="text"
          onChange={(e) => setValue(e)}
          monospaced
        />
      </div>
      <Stack>
        {props.parentField!=="parent" && 
      <Button icon={<X size={30}/>} onClick={cancelHandler}></Button>
    }
      <span className="inputBtnSend">
      <Button icon={<Send size={30} color="white"/>} onClick={btnHandler}>
      </Button>
      </span>
      </Stack>
    </Inline>
    </Box>
  );
};

export default InputField;

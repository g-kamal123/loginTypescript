import {
  Box,
  Card,
  Collapsible,
  Page,
  Stack,
  TextField,
} from "@shopify/polaris";
import React, { FC } from "react";
import { UserPlus } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../../store/slices/Comments";
import { RootState } from "../../store/Store";
import EditCommentModal from "./editCommentModal/EditCommentModal";
import InputField from "./inputField/InputField";
import SingleComment from "./singleComment/SingleComment";
const Comments: FC = () => {
  const store = useSelector((state: RootState) => state.comments);
  const dispatch = useDispatch()
  console.log(store)
  const print = (key: string) => {
    return store.allComments[key].map((item: any) => (
      <Box as="div">
          <br />
        <SingleComment commentData={item}/>
        <Collapsible
          open={item.showReplies}
          id="basic-collapsible"
          transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
          expandOnPrint
        >
          <Box paddingInlineStart={"10"} paddingInlineEnd={"0"} padding={"4"}>

              <Box
                borderInlineStart="dark"
                padding={"5"}
                paddingInlineEnd={"0"}
              >
          {item.next && (
            print(item.next)
          )}
              </Box>
            </Box>
           
        </Collapsible>
        <Collapsible open={item.reply&&store.user!==item.name}
          id="basic-collapsibl"
          transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
          expandOnPrint>
            <><br /><InputField commentData={item}/></>
          </Collapsible>
      </Box>
    ));
  };
  return (
    <Page> 
      <Card sectioned>
        <div className="inputText">
          <Stack distribution="leading">
            <TextField
              autoComplete=""
              label
              placeholder="Enter your name"
              prefix={<UserPlus size={40} />}
              value={store.user}
              onChange={(e) =>dispatch(setUserName({
                name:e
              }))}
              error={store.user.length===0}
              requiredIndicator
            />
          </Stack>
        </div>
        <br />
        <InputField parentField={"parent"} />
      </Card>
      <br />
      <Stack vertical={true}>
        {print("parentComments")}
      </Stack>
      <EditCommentModal />
    </Page>
  );
};

export default Comments;

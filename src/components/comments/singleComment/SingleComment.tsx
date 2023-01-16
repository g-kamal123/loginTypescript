import {
  Avatar,
  Box,
  Button,
  Card,
  Inline,
  Stack,
  Text,
  TextContainer,
} from "@shopify/polaris";
import React, { FC } from "react";
import {
  ChevronDown,
  ChevronUp,
  CornerDownLeft,
  Delete,
  Edit,
  Minus,
  Plus,
} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  commentData,
  deleteComment,
  editComment,
  setLikes,
  setReplyAddress,
  setShowReplies,
} from "../../../store/slices/Comments";
import { RootState } from "../../../store/Store";

type scProps = {
  commentData: commentData;
};
const SingleComment: FC<scProps> = (props) => {
  console.log(props.commentData);
  const store = useSelector((state: RootState) => state.comments);
  const dispatch = useDispatch();
  const replyHandler = () => {
    dispatch(
      setReplyAddress({
        commentData: props.commentData,
      })
    );
  };
  const showRepliesHandler = () => {
    dispatch(
      setShowReplies({
        commentData: props.commentData,
      })
    );
  };
  const deleteCommentHandler = () => {
    dispatch(
      deleteComment({
        commentData: props.commentData,
      })
    );
  };
  const plusLikeHandler = () => {
    dispatch(
      setLikes({
        type: "increase",
        commentData: props.commentData,
      })
    );
  };
  const minusLikeHandler = () => {
    dispatch(
      setLikes({
        type: "decrease",
        commentData: props.commentData,
      })
    );
  };
  const editCommentHandler = () => {
    dispatch(
      editComment({
        commentData: props.commentData,
      })
    );
  };
  return (
    <Card sectioned>
      <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
        <Box
          borderRadius="2"
          padding={"1"}
          paddingBlockStart={"8"}
          shadow="card"
        >
          <Stack vertical={true} alignment="center" distribution="center">
            <Button
              icon={
                <Plus
                  size={15}
                  color={
                    props.commentData.likes.includes(store.user)
                      ? "red"
                      : "black"
                  }
                />
              }
              plain
              onClick={plusLikeHandler}
            ></Button>
            <Text as="span" variant="headingSm" color="success">
              {props.commentData.likes.length}
            </Text>
            <Button
              icon={<Minus size={15} color="black" />}
              plain
              onClick={minusLikeHandler}
            ></Button>
          </Stack>
        </Box>
        <div style={{ width: "100%" }}>
          <Inline align="space-between">
            <Inline>
              <Avatar customer />
              <Text as="h6" variant="headingSm">
                {props.commentData.name}
              </Text>
              <Text as="span" variant="bodySm" color="subdued">
                1 month ago
              </Text>
            </Inline>
            {store.user === props.commentData.name && (
              <Inline align="space-between">
                <Button
                  icon={<Edit size={18} color="blue" />}
                  plain
                  onClick={editCommentHandler}
                ></Button>
                <Button
                  icon={<Delete size={18} color="red" />}
                  plain
                  onClick={deleteCommentHandler}
                ></Button>
              </Inline>
            )}
            {store.user !== props.commentData.name && (
              <Button
                plain
                icon={<CornerDownLeft size={18} />}
                onClick={replyHandler}
              >
                Reply
              </Button>
            )}
          </Inline>
          <br />
          <TextContainer>
            <p>{props.commentData.value}</p>
          </TextContainer>
        </div>
      </div>
      <br />
      <Box paddingInlineStart={"10"}>
        {props.commentData?.next !== "" && (
          <Button
            icon={
              props.commentData.showReplies ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )
            }
            plain
            onClick={showRepliesHandler}
          >
            {`${store.allComments[props.commentData.next].length} replies`}
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default SingleComment;

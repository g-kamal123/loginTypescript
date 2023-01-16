import { createSlice } from "@reduxjs/toolkit";

export type commentData = {
  id: string;
  head: string;
  next: string;
  level?: string;
  value: string;
  name: string;
  reply: boolean;
  showReplies: boolean;
  likes: string[];
};
type commentInitial = {
  allComments: Record<string, commentData[]>;
  currHead: string;
  currId: string;
  user: string;
  modal: boolean;
  modalData: any;
};
let initialState: commentInitial = {
  allComments: { parentComments: [] },
  currHead: "",
  currId: "",
  user: "",
  modal: false,
  modalData: {},
};
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.user = action.payload.name;
    },
    setParentComment: (state, action) => {
      let temp = { ...state.allComments };
      temp.parentComments = [
        ...temp.parentComments,
        {
          id: crypto.randomUUID(),
          head: "parentComments",
          next: "",
          level: "parent",
          value: action.payload.value,
          name: state.user,
          reply: false,
          showReplies: false,
          likes: [],
        },
      ];
      state.allComments = temp;
    },
    setReplyAddress: (state, action) => {
      let temp = { ...state.allComments };
      let tempData = action.payload.commentData;
      temp[tempData.head].map((item) => {
        if (item.id === tempData.id) {
          item.reply = true;
        }
        return 0;
      });
      state.currHead = tempData.head;
      state.currId = tempData.id;
      state.allComments = temp;
    },
    cancelComment: (state, action) => {
      let currHead = action.payload.commentData.head;
      let currId = action.payload.commentData.id;
      let temp = { ...state.allComments };
      temp[currHead].map((item) => {
        if (item.id === currId) {
          item.reply = false;
        }
        return 0;
      });
      state.allComments = temp;
    },
    setChildComment: (state, action) => {
      let currHead = state.currHead;
      let currId = state.currId;
      let temp = { ...state.allComments };
      let next = "";
      temp[currHead].map((item: commentData) => {
        if (item.id === currId) {
          if (item.next !== "") next = item.next;
          else {
            let tempNext = crypto.randomUUID();
            next = tempNext;
            item.next = tempNext;
          }
          item.showReplies = true;
        }
        return 0;
      });
      temp[next] = temp[next] || [];
      temp[next] = [
        ...temp[next],
        {
          id: crypto.randomUUID(),
          head: next,
          next: "",
          value: action.payload.value,
          name: state.user,
          reply: false,
          showReplies: false,
          likes: [],
        },
      ];
      state.allComments = temp;
    },
    setShowReplies: (state, action) => {
      let temp = { ...state.allComments };
      let tempData = action.payload.commentData;
      temp[tempData.head].map((item) => {
        if (item.id === tempData.id) {
          item.showReplies = !item.showReplies;
        }
        return 0;
      });
    },
    deleteComment: (state, action) => {
      let temp = { ...state.allComments };
      let tempData: commentData = action.payload.commentData;
      let allNextPointers = deleteHelper(temp, tempData);
      allNextPointers = allNextPointers.filter((item) => item !== "");
      temp[tempData.head] = temp[tempData.head].filter(
        (item) => item.id !== tempData.id
      );
      for (let i = 0; i < allNextPointers.length; i++) {
        delete temp[allNextPointers[i]];
      }
      state.allComments = temp;
    },
    editComment: (state, action) => {
      state.modal = true;
      state.modalData = action.payload.commentData;
    },
    closeModal: (state) => {
      state.modal = false;
    },
    updateComment: (state, action) => {
      let temp = { ...state.allComments };
      let commentData: commentData = { ...state.modalData };
      let head = commentData.head;
      let id = commentData.id;
      temp[head].map((item) => {
        if (item.id === id) {
          item.value = action.payload.value;
        }
        return 0;
      });
      state.allComments = temp;
      state.modal = false;
    },
    setLikes: (state, action) => {
      let temp = { ...state.allComments };
      let head = action.payload.commentData.head;
      let id = action.payload.commentData.id;
      let type = action.payload.type;
      temp[head].map((item) => {
        if (item.id === id) {
          if (type === "increase") {
            item.likes = [...item.likes, state.user];
            item.likes = [...new Set(item.likes)];
          }
          if (type === "decrease") {
            item.likes = item.likes.filter((it) => it !== state.user);
          }
        }
        return 0;
      });
      state.allComments = temp;
    },
  },
});

const deleteHelper = (
  data: Record<string, commentData[]>,
  comment: commentData
) => {
  let next = comment.next;
  if (next) {
    let delArr = data[next].map((item) => {
      if (item.next) deleteHelper(data, item);
      return next;
    });
    return delArr;
  } else return [""];
};

export const {
  setUserName,
  setParentComment,
  setReplyAddress,
  setChildComment,
  setShowReplies,
  cancelComment,
  deleteComment,
  editComment,
  closeModal,
  updateComment,
  setLikes,
} = commentsSlice.actions;

export default commentsSlice.reducer;

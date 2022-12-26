import { createSlice } from "@reduxjs/toolkit";
import { printData } from "../../components/listing/listingGrid/ListingGrid";

type gridInitial = {
  api: boolean;
  selectCount: number;
  selected: boolean;
  rowkey: string[];
  listData: printData[];
  searchTag: string;
  activePage: number;
  pageCount: number;
  selectedStatus: string;
  sort: string;
  enteredInput: string;
  appliedStatus: string;
  gridHeader:boolean
};
let initialState: gridInitial = {
  api: true,
  selectCount: 0,
  selected: false,
  rowkey: [],
  listData: [],
  searchTag: "",
  activePage: 1,
  pageCount: 10,
  selectedStatus: "",
  sort: "",
  enteredInput: "",
  appliedStatus: "",
  gridHeader:true
};
export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setApiCall: (state) => {
      state.api = !state.api;
      state.activePage = 1;
    },
    setListData: (state, action) => {
      state.listData = action.payload.data;
    },
    removeSelect: (state, action) => {
      state.selectCount = action.payload.count;
      state.selected = action.payload.open;
      state.rowkey = action.payload.allKeys;
      state.gridHeader = false
    },
    selectRows: (state, action) => {
      state.rowkey = action.payload.keys;
      state.selected = !state.selected
      state.gridHeader = action.payload.sel
    },
    setSearchInput: (state, action) => {
      state.searchTag = action.payload.input;
    },
    setStatus: (state, action) => {
      state.selectedStatus = action.payload.status;
    },
    setPagination: (state, action) => {
      if (action.payload.type === "perPage")
        state.pageCount = action.payload.countPerPage;
      if (action.payload.type === "nextPage") state.activePage += 1;
      if (action.payload.type === "prevPage") state.activePage -= 1;
      state.api = !state.api;
    },
    setSort: (state, action) => {
      state.sort = action.payload.sort;
      state.api = !state.api;
    },
    setEnteredInput: (state) => {
      state.enteredInput = state.searchTag;
      state.api = !state.api;
    },
    setAppliedStatus: (state) => {
      state.appliedStatus = state.selectedStatus;
      state.api = !state.api;
    },
    setRemoveTags: (state, action) => {
      console.log(action.payload.tags.emptyKeys);
      let toRemove = action.payload.tags.emptyKeys;
      if (toRemove === "appliedStatus") {
        state.appliedStatus = "";
        state.selectedStatus = "";
      }
      if (toRemove === "searchTag") {
        state.searchTag = "";
        state.enteredInput = "";
      }
      if (toRemove === "sort") {
        state.sort = "";
      }
      state.api = !state.api;
    },
  },
});

export const {
  setApiCall,
  removeSelect,
  selectRows,
  setListData,
  setSearchInput,
  setStatus,
  setPagination,
  setSort,
  setEnteredInput,
  setAppliedStatus,
  setRemoveTags,
} = gridSlice.actions;

export default gridSlice.reducer;

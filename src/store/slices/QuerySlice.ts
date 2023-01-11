import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { queryHelper } from "../../utils/queryHelper/QueryHelper";
type selectOption = {
  label: string;
  value: string;
};
export type rowTypes = {
  category: string;
  constraint: string;
  input: string | string[];
  id: string;
  group: string;
  inputType: string;
  options?: any;
  constraintOption: selectOption[];
};
type queryInitial = {
  rows: selectOption[];
  rowNum: number;
  groupNum: number;
  dataStructure: Record<string, rowTypes[]>;
  alert: boolean;
  queryBadge: string;
  modal: boolean;
  // choiceListselected:[]
};
let initialState: queryInitial = {
  rows: [],
  rowNum: 1,
  groupNum: 1,
  dataStructure: {},
  alert: false,
  queryBadge: "",
  modal: false,
};
export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setModal: (state) => {
      state.modal = !state.modal;
    },
    setAlert: (state, action) => {
      state.alert = action.payload.alt;
    },
    setRows: (state, action) => {
      state.rows = action.payload.row;
      let obj = setRowHelper(action.payload.row, "Group1");
      state.dataStructure = { Group1: [{ ...obj }] };
    },
    setRowNum: (state, action) => {
      state.rowNum += 1;
      let toAddData = addRowHeleper(
        state,
        action.payload.data,
        action.payload.key
      );
      state.dataStructure = { ...state.dataStructure, ...toAddData };
    },
    setGroupNum: (state, action) => {
      state.groupNum += 1;
      let obj = setRowHelper(state.rows, action.payload.key);
      state.dataStructure = {
        ...state.dataStructure,
        [action.payload.key]: [{ ...obj }],
      };
    },
    updateRow: (state, action) => {
      state.alert = false;
      let data: rowTypes[] = [...state.dataStructure[action.payload.group]];
      data.map((item: any) => {
        if (item.id === action.payload.id) {
          if(action.payload?.inputType==="choiceList"){

          }
          if (action.payload.key === "category") {
            item["input"] = "";
            item.options = action.payload.options || [];
            item.constraint = action.payload?.constraintOption[0]?.value;
          }
          item[action.payload.key] = action.payload.value;
          item.inputType = action.payload?.inputType || item.inputType;
          item.constraintOption =
            action.payload?.constraintOption || item.constraintOption;
        }
        return 0;
      });
      let query = badgeHelper({
        ...state.dataStructure,
        [action.payload.group]: data,
      });
      state.queryBadge = query;
      state.dataStructure = {
        ...state.dataStructure,
        [action.payload.group]: data,
      };
      // updateRowHelper(state,action.payload)
    },
    deleteRow: (state, action) => {
      let data: rowTypes[] = [...state.dataStructure[action.payload.group]];
      data = data.filter((item) => item.id !== action.payload.id);
      let query = badgeHelper({
        ...state.dataStructure,
        [action.payload.group]: data,
      });
      state.queryBadge = query;
      state.dataStructure = {
        ...state.dataStructure,
        [action.payload.group]: data,
      };
    },
    deleteGroup: (state, action) => {
      state.alert = false;
      let data = { ...state.dataStructure };
      delete data[action.payload.group];
      let query = badgeHelper({
        ...data,
      });
      state.queryBadge = query;
      state.dataStructure = { ...data };
    },
  },
});

const badgeHelper = (data: Record<string, rowTypes[]>) => {
  let tempBadge = queryHelper(data);
  let q = tempBadge
    .replaceAll("||", "or")
    .replaceAll("&&", "and")
    .replaceAll("==", "equals")
    .replaceAll("!=", "not equals")
    .replaceAll(">=", "greater than equal to")
    .replaceAll(">", "greater than")
    .replaceAll("<", "less than")
    .replaceAll("!%LIKE%", "does not contain")
    .replaceAll("%LIKE%", "contains")
    .replaceAll(" ( ", "(")
    .replaceAll(" ) ", ")").replaceAll("multiselect_brand","Brand").replaceAll("product_type","Product Type");
  return q;
};

const setRowHelper = (
  data: { label: string; value: string }[],
  group: string
) => {
  let category = data[0].value;
  let rowData = JSON.parse(category);
  let constraint = rowData.constraint[0].value;
  return {
    category,
    constraint,
    input: "",
    id: uuid(),
    group,
    inputType: "TextField",
    constraintOption: [...rowData.constraint],
  };
};

const addRowHeleper = (state: queryInitial, data: rowTypes[], key: string) => {
  let toAddRow = setRowHelper(state.rows, key);
  return { [key]: [...data, toAddRow] };
};

export const {
  setRows,
  setRowNum,
  setGroupNum,
  updateRow,
  deleteRow,
  setAlert,
  deleteGroup,
  setModal,
} = querySlice.actions;

export default querySlice.reducer;

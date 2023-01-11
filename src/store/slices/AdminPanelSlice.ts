import { createSlice } from "@reduxjs/toolkit";
import { printData } from "../../components/adminPanel";
import { adminFilter } from "../../utils/adminFilter/AdminFilter";

let option = [
  { label: "equals", value: "1" },
  { label: "not equals", value: "2" },
  { label: "contains", value: "3" },
  { label: "not contains", value: "4" },
  { label: "starts with", value: "5" },
  { label: "ends with", value: "6" },
];
const heading = [
  {
    title: "User Ids(shop ID)",
    id: "id",
    checked: true,
    map: true,
    type: "select&Textfield",
    option: [...option],
    selected: "1",
    input: "",
    filter: "filter[user_id]",
    disabeled:false
  },
  {
    title: "Username",
    id: "username",
    checked: true,
    map: true,
    type: "select&Textfield",
    option: [...option],
    selected: "3",
    input: "",
    filter: "filter[shops.domain]",
    disabeled:false
  },
  {
    title: "Email",
    id: "email",
    checked: true,
    map: true,
    type: "select&Textfield",
    option: [...option],
    selected: "3",
    input: "",
    filter: "filter[shops.0.email]",
    disabeled:false
  },
  {
    title: "Shopify Plan",
    id: "shopify_plan",
    checked: true,
    map: true,
    type: "select&Textfield",
    option: [...option],
    selected: "3",
    input: "",
    filter: "filter[shops.0.plan_name]",
    disabeled:false
  },
  {
    title: "Updated at",
    id: "updated_at",
    checked: false,
    map: true,
    type: "date",
    option: [],
    input: "",
    filter: "dateFilter[u.updated_at]",
    disabeled:false
  },
  {
    title: "Created at",
    id: "created_at",
    checked: false,
    map: true,
    type: "date",
    option: [],
    input: "",
    filter: "dateFilter[u.created_at]",
    disabeled:false
  },
  {
    title: "Shop Url",
    id: "shop_url",
    checked: true,
    map: true,
    type: "select&Textfield",
    option: [...option],
    selected: "3",
    input: "",
    filter: "filter[shops.0.myshopify_domain]",
    disabeled:false
  },
  {
    title: "Login as user",
    id: "user_details1",
    checked: true,
    map: false,
    type: "",
    option: [],
    input: "",
    filter: "",
    disabeled:false
  },
  {
    title: "View user",
    id: "user_details2",
    checked: true,
    map: false,
    type: "",
    option: [],
    input: "",
    filter: "",
    disabeled:false
  },
];
export type columnType = {
  title: string;
  id: string;
  checked: boolean;
  map: boolean;
  type: string;
  option: { label: string; value: string }[];
  selected?: string;
  input: any;
  filter: string;
  disabeled:boolean
};
type panelInitial = {
  loading: boolean;
  totalCustomersCount: number;
  apiCall: boolean;
  allCustomers: printData[];
  headings: columnType[];
  dataPerPage: string;
  currPage: number;
  adminModal: boolean;
  modalData:any
};
const initialState: panelInitial = {
  loading: false,
  totalCustomersCount: 0,
  apiCall: false,
  allCustomers: [],
  headings: heading,
  dataPerPage: "20",
  currPage: 1,
  adminModal: false,
  modalData:{}
};
export const adminPanelSlice = createSlice({
  name: "adminPanel",
  initialState,
  reducers: {
    setAdminModal: (state,action) => {
      state.adminModal = !state.adminModal;
      state.modalData = action.payload.data
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    callAdminApi: (state) => {
      state.apiCall = !state.apiCall;
    },
    setCustomerData: (state, action) => {
      state.allCustomers = action.payload.data;
      state.totalCustomersCount = action.payload.count;
      //   state.headings = action.payload.headings;
    },
    setColumns: (state, action) => {
      let tempColumns = [...state.headings];
      let sum=0
      tempColumns.map((item) => {
        if (item.id === action.payload.id) item.checked = !item.checked;
        item.disabeled = false
        return 0;
      });
      tempColumns.map((item)=>{
        if(item.checked)
        sum += 1
        return 0
      })
      tempColumns.map((item) => {
        if (sum===1&&item.checked) item.disabeled = true;
        return 0;
      });
      state.headings = tempColumns;
    },
    setInputData: (state, action) => {
      let tempColumns = [...state.headings];
      tempColumns.map((item) => {
        if (item.id === action.payload.id) item.input = action.payload.value;
        return 0;
      });
      state.headings = tempColumns;
    },
    setDateInput: (state, action) => {
      let tempColumns = [...state.headings];
      tempColumns.map((item) => {
        if (item.id === "updated_at" || item.id === "created_at") {
          item.input = "";
        }
        if (item.id === action.payload.id) item.input = action.payload.value;
        return 0;
      });
      state.headings = tempColumns;
      state.apiCall = !state.apiCall;
    },
    setInputSelect: (state, action) => {
      let tempColumns = [...state.headings];
      tempColumns.map((item) => {
        if (item.id === action.payload.id) item.selected = action.payload.value;
        return 0;
      });
      state.headings = tempColumns;
      let filter = adminFilter(tempColumns);
      if (Object.keys(filter).length) {
        state.apiCall = !state.apiCall;
      }
    },
    setCountPerPage: (state, action) => {
      state.dataPerPage = action.payload.count;
      state.apiCall = !state.apiCall;
      state.currPage = 1;
    },
    setCurrentPage: (state, action) => {
      if (action.payload.check === "next") state.currPage += 1;
      if (action.payload.check === "prev") state.currPage -= 1;
      state.apiCall = !state.apiCall;
    },
  },
});

export const {
  setLoading,
  setCustomerData,
  setColumns,
  setInputData,
  setInputSelect,
  callAdminApi,
  setCountPerPage,
  setCurrentPage,
  setDateInput,
  setAdminModal,
} = adminPanelSlice.actions;

export default adminPanelSlice.reducer;

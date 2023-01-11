import { Pagination, Select, Stack } from "@shopify/polaris";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountPerPage, setCurrentPage } from "../../../store/slices/AdminPanelSlice";
import { RootState } from "../../../store/Store";

const DataPagination = () => {
  const store = useSelector((state: RootState) => state.adminPanel);
  const dispatch = useDispatch();
  const dataPerPageChange = (e: string) => {
    dispatch(
      setCountPerPage({
        count: e,
      })
    );
  };
  return (
    <div className="paginationAdmin">
    <Stack distribution="trailing">
      <Pagination
        hasPrevious={store.currPage!==1}
        onPrevious={() => {
            dispatch(setCurrentPage({
                check:"prev"
             }))
        }}
        hasNext={(Number(store.dataPerPage)*store.currPage)<=store.totalCustomersCount}
        onNext={() => {
         dispatch(setCurrentPage({
            check:"next"
         }))
        }}
      />
      <Select
        options={[
          { label: "10", value: "10" },
          { label: "20", value: "20" },
          { label: "30", value: "30" },
          { label: "40", value: "40" },
          { label: "50", value: "50" },
        ]}
        label=""
        onChange={dataPerPageChange}
        value={store.dataPerPage}
      />
    </Stack>
    </div>
  );
};

export default DataPagination;

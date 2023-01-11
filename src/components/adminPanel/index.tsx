import { Card, Frame, Page, Stack, Text } from "@shopify/polaris";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerData, setLoading } from "../../store/slices/AdminPanelSlice";
import { RootState } from "../../store/Store";
import { adminFilter } from "../../utils/adminFilter/AdminFilter";
import { useFetch } from "../../utils/fetchHook/FetchHook";
import { adminPanelHeader } from "../../utils/headers/Headers";
import DataPagination from "./dataPagination/DataPagination";
import Di from "./di/Di";
import FilterPanel from "./filterPanel/FilterPanel";
import GridList from "./gridList/GridList";
import GridModal from "./gridModal/GridModal";

type userDetails = Record<string, string>;
// type apiData = Record<string,userDetails|string|number>
export type printData = {
  user_ids: number;
  shop_id: string;
  username: string;
  email: string;
  shopify_plan: string;
  updated_at: string;
  created_at: string;
  shop_url: string;
  user_details: userDetails;
};
const AdminPanel: FC = () => {
  const store = useSelector((state: RootState) => state.adminPanel);
  const [apiCall] = useFetch(
    "https://fbapi.sellernext.com/frontend/admin/getAllUsers"
  );
  const dispatch = useDispatch();
  const getData = async () => {
    dispatch(setLoading())
    let filter =adminFilter(store.headings)
    let payload = {
      db: "db",
      activePage: store.currPage,
      count: Number(store.dataPerPage),
      ...filter
    };
    const ftch = await apiCall._get({ ...payload }, adminPanelHeader);
    const dt: printData[] = ftch.data.rows;
    console.log(dt)
    createPrintableData(dt,ftch.data.count);
  };
  const createPrintableData = (data: printData[],count:number) => {
    let temp = [...data];
    let customersData: printData[] = temp.map(
      ({
        user_ids,
        shop_id,
        username,
        email,
        shopify_plan,
        updated_at,
        created_at,
        shop_url,
        user_details,
      }) => {
        return {
          user_ids,
          shop_id,
          username,
          email,
          shopify_plan,
          updated_at,
          created_at,
          shop_url,
          user_details,
        };
      }
    );

    dispatch(
      setCustomerData({
        data: customersData,
        count
        // headings,
      })
    );
    dispatch(setLoading())
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.apiCall]);

  return (
    <Frame>
      <Di>
      <Page fullWidth>
          <Card>
            <Card sectioned>
            <Stack distribution="fill" alignment="leading">
              <Text as="h3" variant="headingXl" >Facebook Integration</Text>
              <Text as="span" variant="bodyLg" alignment="end">Showing from {(store.currPage-1)*Number(store.dataPerPage)} to {(store.currPage)*Number(store.dataPerPage)} of <Text as="span" variant="headingXl">29335 </Text>
                Users</Text>
            </Stack>
            <hr />
        <DataPagination />
            <FilterPanel />
            <GridList />
            </Card>
          </Card>
          <GridModal />
      </Page>
      </Di>
    </Frame>
  );
};

export default AdminPanel;

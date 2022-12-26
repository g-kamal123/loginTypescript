import { Avatar, FlexChild, FlexLayout, Grid, TextStyles } from "@cedcommerce/ounce-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSelect, setListData } from "../../../store/slices/GridSlice";
import { RootState } from "../../../store/Store";
import { useFetch } from "../../../utils/fetchHook/FetchHook";
import { filters } from "../../../utils/filters/Filters";
import { getProductHeader } from "../../../utils/headers/Headers";

export type printData = {
  key: string;
  img: string;
  name: string;
  sku: string;
  status: string;
  inventory: number;
};
const ListingGrid = () => {
  const store = useSelector((state:RootState)=>state.grid);
  const [loading,setLoading] = useState<boolean>(false);
  const dispatch = useDispatch()
  console.log(store.rowkey)
  const [apiCall] = useFetch(
    "https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts"
  );
  const rowSelectionHandler =(keys:string[],rows:printData[])=>{
    let flag = false
    if(store.listData.length===keys.length)
    flag = true
    dispatch(removeSelect({
      count:keys.length,
      open:flag,
      allKeys:keys
    }))
    console.log(keys)
  }
  const createData = (data: any) => {
    // console.log(data)
    const itemsData = data.map((item: any) => item.items[0]);
    const printableData = itemsData.map((item: any) => {
      return {
        key: item.sku,
        img:item.main_image,
        name: item.title,
        sku: item.sku,
        status: item.status,
        inventory: item.quantity,
      };
    });
    dispatch(setListData({
      data:[...printableData]
    }))
    // setListData([...printableData]);
  };
  const getData = async () => {
    setLoading(true);
    let filter = filters()
    let payload = {
      ...filter,
      productOnly: true,
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    };
    const ftch = await apiCall._get({ ...payload }, getProductHeader);
    const dt = ftch.data.rows;
    const data = [...dt];
    createData(data);
    setLoading(false)
  };
  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.api]);
  console.log(store.api)
  let selectedRows = store.rowkey
  // let rowSelection = {
  //   selectedRows,
  //   onchange:rowSelectionHandler
  // }
  return (
    <Grid
    loading={loading}
    showHeader={store.gridHeader}
      columns={[
        {
          align: "center",
          dataIndex: "name",
          key: "name",
          title: "Product Name",
          width: 100,
          render:(__:any,items:printData)=>{
            return <>
            <FlexLayout spacing="loose" valign="center">
              <FlexChild desktopWidth="33" tabWidth="33">
                <Avatar 
                image={items.img}
                type="square"/>
              </FlexChild>
              <FlexChild desktopWidth="66" tabWidth="66">
                <TextStyles>{items.name}</TextStyles>
              </FlexChild>
            </FlexLayout>
            </>
          }
        },
        {
          align: "center",
          dataIndex: "sku",
          key: "age",
          title: "Sku",
          width: 100,
        },
        {
          align: "center",
          dataIndex: "status",
          key: "address",
          title: "Status",
          width: 100,
        },
        {
          align: "center",
          dataIndex: "inventory",
          key: "address",
          title: "Inventory",
          width: 100,
        },
      ]}
      dataSource={[...store.listData]}
      
      
      rowSelection={{
        selectedRowKeys:selectedRows,
        onChange: (keys:string[],rows:printData[])=>rowSelectionHandler(keys,rows),
      }}
    />
  );
};

export default ListingGrid;

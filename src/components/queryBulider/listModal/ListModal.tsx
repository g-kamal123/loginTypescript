import { Avatar, FlexChild, FlexLayout, Grid, Modal, TextStyles } from "@cedcommerce/ounce-ui";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../store/slices/QuerySlice";
import { RootState } from "../../../store/Store";
import { useFetch } from "../../../utils/fetchHook/FetchHook";
import { queryHelper } from "../../../utils/queryHelper/QueryHelper";

const ListModal: FC = () => {
  const [apiCall] = useFetch(
    "https://multi-account.sellernext.com/home/public/connector/profile/getQueryProducts"
  );
  const store = useSelector((state: RootState) => state.query);
  const dispatch = useDispatch();
  const [listData,setListData] = useState<any>([])
  const [loading,setLoading] = useState<boolean>(false)
  const closeModal = () => {
    dispatch(setModal());
  };
  const getData = async() => {
    setLoading(true)
    let query = queryHelper(store.dataStructure);
    let payload = {
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      source: {
        shopId: "889",
        marketplace: "shopify",
      },
      target: {
        shopId: "890",
        marketplace: "twitter",
      },
      query,
      activePage: 1,
      limit: 50,
      overWriteExistingProducts: false,
      useRefinProduct: true,
      useForcedRefineProductTable: true,
    };
    const ftch = await apiCall._post({...payload})
    let data = ftch.data.rows
    console.log(ftch.data.rows)
    createData(data);
  };
  const createData =(data:any)=>{
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
    setListData([...printableData])
    setLoading(false)
  }
  useEffect(() => {
    if (store.modal) {
      getData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.modal]);
  return (
    <>
      <Modal
        open={store.modal}
        close={closeModal}
        heading="Filtered products"
        modalSize="medium"
        overlayClose
      >
        <Grid
        loading={loading}
      columns={[
        {
          align: "center",
          dataIndex: "name",
          key: "name",
          title: "Product Name",
          width: 100,
          render:(__:any,items:any)=>{
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
      dataSource={[...listData]}
    />

      </Modal>
    </>
  );
};

export default ListModal;

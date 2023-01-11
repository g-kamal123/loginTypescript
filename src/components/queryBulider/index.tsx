import {
  Alert,
  Badge,
  Button,
  Card,
  FlexLayout,
  TextStyles,
} from "@cedcommerce/ounce-ui";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlert,
  setGroupNum,
  setModal,
  setRows,
} from "../../store/slices/QuerySlice";
import { RootState } from "../../store/Store";
import { useFetch } from "../../utils/fetchHook/FetchHook";
import { queryHelper } from "../../utils/queryHelper/QueryHelper";
import FilterGroup from "./filterGroup/FilterGroup";
import { v4 as uuid } from "uuid";
import ListModal from "./listModal/ListModal";

const QueryBuilder: FC = () => {
  const store = useSelector((state: RootState) => state.query);
  const dispatch = useDispatch();
  const [loading,setLoading] = useState<boolean>(false)
  const [apiCall] = useFetch(
    "https://multi-account.sellernext.com/home/public/connector/source/getFilterAttributes"
  );
  const [queryCall] = useFetch(
    "https://multi-account.sellernext.com/home/public/connector/profile/getQueryProductsCount"
  );
  const [productCount, setProductCount] = useState<number>(0);

  const getData = async () => {
    const payload = {
      source: { shopId: "889", marketplace: "shopify" },
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    };
    const ftch = await apiCall._post({ ...payload });
    let dt = ftch.data;
    dt = dt.filter(
      (item: any) =>
        item.title !== "Variant attributes" && item.title !== "Collections" && item.title !== "Type"
    );
    let stringConstraint = [
      { label: "Contains", value: "%LIKE%" },
      { label: "Equals", value: "==" },
      { label: "Not Equals", value: "!=" },
      { label: "Does Not Contain", value: "!%LIKE%" },
    ];
    let numberConstraint = [
      { label: "Equals", value: "==" },
      { label: "Not Equals", value: "!=" },
      { label: "Greater Than", value: ">" },
      { label: "Less Than", value: "<" },
      { label: "Greater Than Equal To", value: ">=" },
    ];
    let binaryConstraint = [
      { label: "Equals", value: "==" },
      { label: "Not Equals", value: "!=" },
    ];
    for (let i = 0; i < dt.length; i++) {
      dt[i].constraint = stringConstraint;
      if (dt[i].title === "Price" || dt[i].title === "Quantity")
        dt[i].constraint = numberConstraint;
      if (dt[i].title === "Product status" || dt[i].title === "Product Type")
        dt[i].constraint = binaryConstraint;
      if (dt[i].title === "Vendor") {
        dt[i].title = "Brand";
        dt[i].constraint = binaryConstraint;
      }
    }
    console.log(dt)
    dt = dt.map((item: any) => {
      return {
        label: item.title,
        value: JSON.stringify({
          title: item.title,
          options: item.options || [],
          constraint: item.constraint,
        }),
      };
    });
    dispatch(setRows({ row: [...dt] }));

    // console.log(dt);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addGroupHandler = () => {
    let key = uuid();
    dispatch(
      setGroupNum({
        key,
      })
    );
  };
  const queryMaker = async () => {
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
      overWriteExistingProducts: false,
      useRefinProduct: true,
    };
    // console.log(query);
    if (!query) return;
    setLoading(true)
    const ftch = await queryCall._post({ ...payload });
    const data = ftch.data.count;
    dispatch(
      setAlert({
        alt: true,
      })
    );
    if (data) setProductCount(data);
    else setProductCount(0);
    setLoading(false)
  };
  const openMoadal = () => {
    dispatch(setModal());
  };
  return (
    <Card>
      {store.queryBadge && <Badge type="Neutral-400">{store.queryBadge}</Badge>}
      {store.rows.length > 0 &&
        Object.keys(store.dataStructure).map((item, key) => (
          <FilterGroup key={key} allrows={store.dataStructure[item]} />
        ))}
      <FlexLayout spacing="loose">
        <Button content="Add Group" type="Shadowed" onClick={addGroupHandler} />
        <Button content="Run Query" type="Shadowed" onClick={queryMaker} loading={loading}/>
      </FlexLayout>
      <br />
      {store.alert && (
        <Alert
          destroy={false}
          type={productCount > 0 ? "success" : "danger"}
          children={""}
          desciption={
            <>
              <TextStyles>
                {productCount} products found{" "}
                {productCount > 0 && (
                  <a href="#list" onClick={openMoadal}>
                    View Sample Product(s)
                  </a>
                )}
              </TextStyles>
            </>
          }
        />
      )}
      <ListModal />
    </Card>
  );
};

export default QueryBuilder;

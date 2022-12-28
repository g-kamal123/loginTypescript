import { Button, Card, Grid } from "@cedcommerce/ounce-ui";
import React, { FC, useEffect, useState } from "react";
import { useFetch } from "../../utils/fetchHook/FetchHook";
import GroupSelect from "./groupSelect/GroupSelect";

type COopts = {
  opts: string[];
  name: string;
  key: string;
  index:number;
  value:string;
  custom:string;
};
const AttrMapping: FC = () => {
  const [apiCall] = useFetch(
    "https://multi-account.sellernext.com/home/public/connector/product/getProductAttributes"
  );
  const [apiData, setAPiData] = useState<string[]>([]);
  const [customOpts, setCustomOpts] = useState<COopts[]>([]);
  // const []

  const getData = async () => {
    let payload = {
      target_marketplace: "twitter",
      source: {
        shopId: "889",
        marketplace: "shopify",
      },
      target: {
        shopId: "890",
        marketplace: "twitter",
      },
      productOnly: true,
    };
    const ftch = await apiCall._post({ ...payload });
    const dt = ftch.data.map((item: { title: string }) => item.title);
    setAPiData(["Set Custom",...dt]);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addBtnHandler = () => {
    let temp = [...customOpts];
    let data:COopts[]  = [];
    for (let i = 0; i <= temp.length; i++) {
      data = [
        ...customOpts,
        { name: `Custom ${i}`, opts: apiData, key: `${Math.random() * 100}`,index:i,value:"",custom:""},
      ];
    }
    setCustomOpts([...data])
  };
  const selectHandler =(e:string,val:number|undefined)=>{
    let t = val || 0;
    let temp = customOpts
    temp[t].value = e
    setCustomOpts([...temp])
  }
  const delHandler = (val:number|undefined)=>{
    let t:number = val || 0
        let temp = customOpts
        let temp2 = [...customOpts]
        // let dt = temp.filter((item,key)=>key===val)
        temp = temp.filter((item,key)=>key!==val)
        for(let i=t;i<temp.length;i++){
            temp[i].name = `Custom ${i}`
            temp[i].value = temp2[i+1].value
            temp[i].custom = temp2[i+1].custom
            temp[i].index = i
        }
        setCustomOpts([...temp])
  }
  return (
    <>
      <Card
        title={"Required Attributes"}
        subTitle="Based on the category selected, you need to map Twitter attributes with Shopify attributes."
      >
        <Grid
          size="small"
          columns={[
            {
              align: "start",
              dataIndex: "name",
              key: "name",
              title: "Twitter attributes",
              width: 30,
            },
            {
              align: "center",
              //   dataIndex: 'age',
              key: "Shopify attributes",
              title: "Shopify attributes",
              width: 70,
              render: (__: any, { opts }: any) => <GroupSelect opts={opts} />,
            },
          ]}
          dataSource={[
            {
              opts: ["new", "used", "refurbished"],
              name: "Condition",
              key: "Condition",
            },
            {
              opts: ["female", "male", "unisex"],
              name: "Gender",
              key: "Gender",
            },
            {
              opts: [
                "adult",
                "all ages",
                "teen",
                "kids",
                "toddler",
                "infant",
                "newborn",
              ],
              name: "Age Group",
              key: "Age Group",
            },
            {
              opts: apiData,
              name: "Description",
              key: "Description",
            },
            {
              opts: apiData,
              name: "Brand",
              key: "Brand",
            },
          ]}
        />
      </Card>
      <Card
        title={"Optional Attributes"}
        subTitle="This is an optional set of attributes that you may or may not map as per your requirements."
      >
        <Grid
          showHeader={false}
          size="small"
          columns={[
            {
              align: "start",
              dataIndex: "name",
              key: "name",
              title: "Twitter attributes",
              width: 100,
            },
            {
              align: "center",
              //   dataIndex: 'age',
              key: "Shopify attributes",
              title: "Shopify attributes",
              width: 100,
              render: (__: any, { opts }: any) => <GroupSelect opts={opts} />,
            },
          ]}
          dataSource={[
            {
              opts: ["new", "used", "refurbished"],
              name: "Size",
              key: "Size",
            },
            {
              opts: ["female", "male", "unisex"],
              name: "Color",
              key: "Color",
            },
          ]}
        />
        <Button type="Outlined" onClick={addBtnHandler} disable={customOpts.length===5}>
          Add Attributes
        </Button>
        {customOpts.length>0 && <Grid
          showHeader={false}
          size="small"
          columns={[
            {
              align: "start",
              dataIndex: "name",
              key: "name",
              title: "Twitter attributes",
              width: 100,
            },
            {
              align: "end",
              //   dataIndex: 'age',
              key: "Shopify attributes",
              title: "Shopify attributes",
              width: 100,
              render: (__: any, data: any) => (
                <GroupSelect opts={data.opts} index={data.index} add={"add"} delHandler={delHandler} selValue={data.value} selectHandler={selectHandler}/>
              ),
            },
          ]}
          dataSource={customOpts}
        />}
        
      </Card>
    </>
  );
};

export default AttrMapping;

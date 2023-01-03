import { Card, FlexLayout, Loader, Select } from "@cedcommerce/ounce-ui";
import React, { FC, useEffect, useState } from "react";
import { useFetch } from "../../utils/fetchHook/FetchHook";
import { getProductHeader } from "../../utils/headers/Headers";

// type optValue ={
//     next_level:string,
//     has_children:number,
//     display_path:string
// }
type optData = {
  label: string;
  value: string;
};
const MultiLevelSelection: FC = () => {
  const [apiCall] = useFetch(
    "https://multi-account.sellernext.com/home/public/connector/profile/getRootCategory"
  );
  const [nextCall] = useFetch(
    "https://multi-account.sellernext.com/home/public/connector/profile/getCatrgoryNextLevel"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [opts, setOpts] = useState<optData[][]>([[]]);
  const [selectedOpts, setSelectedOpts] = useState<string[]>([]);
  const [subTitle,setSubTitle] = useState<string>("")
  const getData = async (payload: any) => {
    const ftch = await apiCall._get({ ...payload }, getProductHeader);
    const dt = ftch.data;
    let data = createPrintableData([...dt]);
    return data;
  };
  const createPrintableData = (data: any) => {
    // console.log(data);
    let options = data.map((item: any) => {
      return {
        label: item.name,
        value: JSON.stringify({
          next_level: item.next_level,
          has_children: item.has_children || 0,
          display_path: item.display_path,
        }),
      };
    });
    return options;
  };
  useEffect(() => {
    const callApi = async () => {
      let payload = {
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        marketplace: "twitter",
      };
      let data = await getData(payload);
      setOpts([[...data]]);
    };
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const callNextHandler = async (payload: any) => {
    const ftch = await nextCall._get({ ...payload }, getProductHeader);
    // console.log(ftch)
    const dt = ftch.data;
    let data = createPrintableData([...dt]);
    return data;
  };
  const selectChangeHandler = async (e: string, key: number) => {
    let temp = JSON.parse(e);
    let subtitle = temp.display_path
    setSubTitle(subtitle)
    let selectedTemp = [...selectedOpts].slice(0,key+1);
    selectedTemp[key] = e;
    setSelectedOpts([...selectedTemp]);
    let optsTemp = [...opts].slice(0, key + 1);
    setOpts([...optsTemp]);
    if (temp.has_children) {
      setLoading(true);
      let payload = {
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        next_level: temp.next_level,
      };
      let data = await callNextHandler(payload);
      setOpts([...optsTemp, [...data]]);
      setLoading(false);
    }
  };
  return (
    <Card subTitle={subTitle} title={"Category Selection"}>
      <FlexLayout direction="vertical" spacing="loose">
      {opts.map((item, key) => (
        <Select
          key={key}
          //    dropDownheight={200}
          value={selectedOpts[key]}
          onChange={(e) => selectChangeHandler(e, key)}
          options={opts[key]}
        />
      ))}
      {loading && <Loader type="Loader1"></Loader>}
      </FlexLayout>
    </Card>
  );
};

export default MultiLevelSelection;

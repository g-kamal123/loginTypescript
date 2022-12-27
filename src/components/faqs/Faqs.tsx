import {
  Accordion,
  Button,
  Card,
  FlexLayout,
  TextField,
} from "@cedcommerce/ounce-ui";
import React, { useEffect, useState } from "react";
import { MinusCircle, PlusCircle, Search } from "react-feather";
import { useFetch } from "../../utils/fetchHook/FetchHook";
import { getProductHeader } from "../../utils/headers/Headers";

type acdType = {
  key: string;
  content: string;
  title: string;
  open: boolean;
  more: boolean;
};
const Faqs = () => {
  const [apiCall] = useFetch(
    "https://multi-account.sellernext.com/home/public/twitter/faq/getAllFaqForCustomer"
  );
  const [searchCall] = useFetch(
    "https://multi-account.sellernext.com/home/public/twitter/faq/search"
  );
  const [apiData, setApiData] = useState<any>({});
  const [searchedInput, setSearchedInput] = useState<string>("");
  const [allcount, setAllCount] = useState<number[]>([1, 1, 1]);
  const [searchCount, setSearchCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const inputHandler = (e: string) => {
    setSearchedInput(e);
  };
  const searchFaqsHandler = async (activePage: number = 1) => {
    setLoading(true);
    let payload = {
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      activePage,
      pageSize: 10,
      query: searchedInput,
    };
    const ftch = await searchCall._get({ ...payload }, getProductHeader);
    const dt = [...ftch.response];
    if(!dt.length)
    return {}
    const data = dt.map((item: { answer: string; question: string }) => {
      return {
        key: item.question,
        content: item.answer,
        title: item.question,
        open: false,
        more: ftch.show_more,
      };
    });
    setLoading(false);
    return { "": data };
  };
  const getData = async (section_code: string = "", activePage: number = 1) => {
    setLoading(true);
    let payload = {
      target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
      activePage,
      pageSize: 5,
      section_code,
    };
    const ftch = await apiCall._get({ ...payload }, getProductHeader);
    const dt = ftch.response;
    let createdData = createPrintableData({ ...dt });
    setLoading(false);
    return createdData;
  };

  const createPrintableData = (val: any) => {
    console.log(val);
    let data1 = Object.values(val).map((item: any) => {
      return item;
    });
    console.log(data1);
    let dt = data1.map((item) => {
      return {
        [item.section_name]: item.data.map(
          (it: { answer: string; question: string }) => {
            return {
              key: it.question,
              content: it.answer,
              title: it.question,
              open: false,
              more: item.show_more,
            };
          }
        ),
      };
    });
    let printableData = {};
    dt.map((item) => {
      printableData = { ...printableData, ...item };
      return 0;
    });
    console.log(printableData);
    return printableData;
  };

  useEffect(() => {
    const callData = async () => {
      let data = await getData();
      setApiData({ ...data });
    };
    callData();
  }, []);
  const accordianClickHandler = (val: string, group: string) => {
    let temp = { ...apiData };
    let newTemp = temp[group];
    newTemp.map((item: acdType) => {
      if (item.key === val) item.open = !item.open;
      return 0;
    });
    temp[group] = newTemp;
    setApiData({ ...temp });
  };
  const showMoreHandler = async (val: string) => {
    let data: any = {};
    if (val) {
      if (val === "General Queries") {
        data = await getData("general_queries", allcount[0] + 1);
        let count = [...allcount];
        count[0] += 1;
        setAllCount([...count]);
      }
      if (val === "Product Section") {
        data = await getData("product_section", allcount[1] + 1);
        let count = [...allcount];
        count[1] += 1;
        setAllCount([...count]);
      }
      if (val === "Template Section") {
        data = await getData("template_section", allcount[2] + 1);
        let count = [...allcount];
        count[2] += 1;
        setAllCount([...count]);
      }
    }
    if (!val) {
      data = await searchFaqsHandler(searchCount + 1);
      setSearchCount((prev) => prev + 1);
    }
    let temp = { ...apiData };
    temp[val] = [...temp[val], ...data[val]];
    setApiData(temp);
  };
  const showLessHandler = async (val: string) => {
    let data: any = {};
    if (val) {
      if (val === "General Queries") {
        data = await getData("general_queries", allcount[0] - 1);
        let count = [...allcount];
        count[0] -= 1;
        setAllCount([...count]);
      }
      if (val === "Product Section") {
        data = await getData("product_section", allcount[1] - 1);
        let count = [...allcount];
        count[1] -= 1;
        setAllCount([...count]);
      }
      if (val === "Template Section") {
        data = await getData("template_section", allcount[2] - 1);
        let count = [...allcount];
        count[2] -= 1;
        setAllCount([...count]);
      }
    }
    if (!val) {
      data = await searchFaqsHandler(searchCount - 1);
      setSearchCount((prev) => prev - 1);
    }
    let temp = { ...apiData };
    temp[val] = [...data[val]];
    setApiData(temp);
  };
  return (
    <>
      <Card title={"FAQs"}>
        <TextField
          value={searchedInput}
          onChange={inputHandler}
          onEnter={async () => {
            let data = await searchFaqsHandler();
            console.log(data);
            setApiData({ ...data });
          }}
          prefix={<Search size={18} />}
        />
      </Card>
      {Object.keys(apiData).length > 0 &&
        Object.keys(apiData).map((item) => (
          <Card title={item} key={item}>
            {apiData[item].map((it: any) => (
              <Accordion
                key={it.key}
                active={it.open}
                boxed
                icon
                iconAlign="left"
                onClick={() => accordianClickHandler(it.key, item)}
                title={it.title}
              >
                <div dangerouslySetInnerHTML={{ __html: it.content }}></div>
              </Accordion>
            ))}
            <br />
            {apiData[item][0]?.more && (
              <FlexLayout halign="center">
                <Button
                  loading={loading}
                  icon={apiData[item][apiData[item].length - 1].more?<PlusCircle size={18} />:<MinusCircle size={18}/>}
                  type="Secondary"
                  onClick={() => {
                    if (apiData[item][apiData[item].length - 1].more)
                      showMoreHandler(item);
                    if (!apiData[item][apiData[item].length - 1].more)
                      showLessHandler(item);
                  }}
                >
                  {apiData[item][apiData[item].length - 1].more
                    ? "Show More"
                    : "Show Less"}
                </Button>
              </FlexLayout>
            )}
          </Card>
        ))}
        {Object.keys(apiData)?.length===0 && <Card>
          <FlexLayout halign="center" valign="center">
          <img src="https://testing-twitterads.cifapps.com/a1a11a245e9b3e534fc8b653d3035f4d.png" alt=""/>
          </FlexLayout>
          </Card>}
    </>
  );
};

export default Faqs;

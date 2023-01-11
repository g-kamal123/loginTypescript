import {
  Button,
  Card,
  DatePicker,
  IndexTable,
  Layout,
  Popover,
  Select,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  Text,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import React, { FC, useState } from "react";
import { Calendar } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  callAdminApi,
  setAdminModal,
  setDateInput,
  setInputData,
  setInputSelect,
} from "../../../store/slices/AdminPanelSlice";
import { RootState } from "../../../store/Store";

const GridList: FC = () => {
  const store = useSelector((state: RootState) => state.adminPanel);
  const [calender, setCalender] = useState<boolean[]>([false, false]);
  const [{month,year},setMOnth] = useState({month:new Date().getMonth(),year:new Date().getUTCFullYear()})
  const dispatch = useDispatch();
  // const { ref, isComponentVisible,t } = useComponentVisible(true);
 

  const headings: any = store.headings
    .map((item) => {
      if (item.checked)
        return {
          title: (
            <Text variant="headingXl" as="h4">
              {item.title}
            </Text>
          ),
          id: item.id,
        };
      return "0";
    })
    .filter((item) => item !== "0");
  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const viewHandler = (data:any)=>{
    console.log(data)
    dispatch(setAdminModal({
      data
    }))
  }

  const rowMarkup = store.allCustomers.map((item: any, index) => (
    <IndexTable.Row
      id={item.shop_id}
      key={item.user_ids}
      // selected={selectedResources.includes(id)}
      position={index + 1}
    >
      {store.headings
        .map(({ id, checked, map, title }, key) =>
          checked ? (
            map ? (
              <IndexTable.Cell className={`${(id==="updated_at"|| id==="created_at") && "dateInput"}`}>
                
                  <Text breakWord={true} variant="bodyLg" as="p" fontWeight="regular">
                    {key ? item[id] : `${item.user_ids}(${item.shop_id})`}
                  </Text>
               
              </IndexTable.Cell>
            ) : (
              <IndexTable.Cell>
                <span className="btnBlue">
                  <Button primary onClick={()=>viewHandler(item)}>{title.split(" ")[0]}</Button>
                </span>
              </IndexTable.Cell>
            )
          ) : (
            "0"
          )
        )
        .filter((it) => it !== "0")}
    </IndexTable.Row>
  ));
  const updateDate =(date:any,id:string)=>{
    let start:string = `${date.end}`
    let temp = start.split(' ')
    let months = ["",'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let value = `${temp[3]}-${String("0"+months.indexOf(temp[1])).slice(-2)}-${temp[2]}`
    dispatch((setDateInput({
      value,
      id
    })))
  } 
  const rowInput = (
    <IndexTable.Row id="inputRow" position={0}>
      {store.headings.map((item) => {
        if (item.type === "select&Textfield" && item.checked === true)
          return (
            <IndexTable.Cell>
              <Select
                options={item.option}
                label=""
                value={item.selected}
                onChange={(e) => inputSelectChangeHandler(e, item.id)}
              />
              <div id={`${item.id}`} onKeyDown={(e) => inputHandler(e)}>
                <TextField
                  name="av"
                  label=""
                  value={item.input}
                  onChange={(e, name) => handleChange(e, item.id)}
                  autoComplete="off"
                />
              </div>
            </IndexTable.Cell>
          );
        if (item.type === "date" && item.checked === true)
          return (
            <IndexTable.Cell className="dateInput">
              {/* <input type={'date'}/> */}
              {item.id === "updated_at" && (
                <Popover
                  active={calender[0]}
                  activator={
                    <Button
                      icon={<Calendar size={18} />}
                      onClick={() => btnHandler(item.id)}
                    />
                  }
                  onClose={() => {setCalender([false,false])}}
                >
                  <DatePicker month={month} year={year} onChange={(date)=>updateDate(date,item.id)} allowRange onMonthChange={(month,year)=>{
                    setMOnth({month,year})
                  }}/>
                </Popover>
              )}
              {item.id === "created_at" && (
                <Popover
                  active={calender[1]}
                  activator={
                    <Button
                      icon={<Calendar size={18} />}
                      onClick={() => btnHandler(item.id)}
                    />
                  }
                  onClose={() => {setCalender([false,false])}}
                >
                  <DatePicker month={month} year={year} onChange={(date)=>updateDate(date,item.id)} onMonthChange={(month,year)=>{
                    setMOnth({month,year})
                  }}/>
                </Popover>
              )}
            </IndexTable.Cell>
          );
        if (item.checked) return <IndexTable.Cell></IndexTable.Cell>;
      })}
    </IndexTable.Row>
  );

  const btnHandler = (id: string) => {
    let temp = [...calender];
    if (id === "updated_at") {
      temp[0] = !temp[0];
      temp[1] = false;
    }
    if (id === "created_at") {
      temp[0] = false;
      temp[1] = !temp[1];
    }
    setCalender([...temp]);
  };
  const inputHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      dispatch(callAdminApi());
    }
  };
  const handleChange = (value: string, id: string) => {
    dispatch(
      setInputData({
        value,
        id,
      })
    );
  };
  const inputSelectChangeHandler = (value: string, id: string) => {
    dispatch(
      setInputSelect({
        value,
        id,
      })
    );
  };

  return (
    <Card sectioned>
      <IndexTable
      loading={store.loading}
        resourceName={resourceName}
        itemCount={2}
        headings={headings}
        selectable={false}
      >
        {rowInput}
        {!store.loading && rowMarkup}
      </IndexTable>
      {store.loading && 
       <SkeletonPage primaryAction fullWidth>
       <Layout>
         <Layout.Section>
           <Card sectioned>
             <SkeletonBodyText />
           </Card>
           <Card sectioned>
             <TextContainer>
               <SkeletonDisplayText size="small" />
               <SkeletonBodyText />
             </TextContainer>
           </Card>
           <Card sectioned>
             <TextContainer>
               <SkeletonDisplayText size="small" />
               <SkeletonBodyText />
             </TextContainer>
           </Card>
         </Layout.Section>
         <Layout.Section secondary>
           <Card>
             <Card.Section>
               <TextContainer>
                 <SkeletonDisplayText size="small" />
                 <SkeletonBodyText lines={2} />
               </TextContainer>
             </Card.Section>
             <Card.Section>
               <SkeletonBodyText lines={1} />
             </Card.Section>
           </Card>
           <Card subdued>
             <Card.Section>
               <TextContainer>
                 <SkeletonDisplayText size="small" />
                 <SkeletonBodyText lines={2} />
               </TextContainer>
             </Card.Section>
             <Card.Section>
               <SkeletonBodyText lines={2} />
             </Card.Section>
           </Card>
         </Layout.Section>
       </Layout>
     </SkeletonPage>}
        {store.allCustomers.length===0 && !store.loading &&
        <IndexTable itemCount={0} headings={headings}>
        {}
      </IndexTable>}
      
    </Card>
  );
};

export default GridList;

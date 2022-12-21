import {
  ActionList,
  Button,
  Card,
  FlexChild,
  FlexLayout,
} from "@cedcommerce/ounce-ui";
import React, { useEffect, useState } from "react";
import Linechart from "../../../utils/linechart/Linechart";
export type Datasets = {
  data: string[];
  label: string;
  labels: string[];
};
const CalenderGraph = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [text,setText] = useState<string>("Monthly")
  const [graphData, setGraphData] = useState<Datasets[]>([]);
  const todayHandler = () => {
    let dummyData = {
      data: ["300", "550", "400", "200", "800", "500"],
      label: "Today",
      labels: ["9 am", "10 am", "11 am", "12 am", "1 am", "2 am"],
    };
    setGraphData([dummyData]);
    setOpen(false);
    setText("Today")
  };
  const monthlyHandler = () => {
    let dummyData = {
      data: ["100", "250", "700", "200", "800", "500"],
      label: "Monthly",
      labels: ["Jan", "feb", "mar", "apr", "may", "june"],
    };
    setGraphData([dummyData]);
    setOpen(false);
    setText("Monthly")
  };
  const yearlyHandler = () => {
    let dummyData = {
      data: ["100", "150", "500", "100", "800", "900"],
      label: "Yearly",
      labels: ["2010", "2011", "2012", "2020", "2021", "2022"],
    };
    setGraphData([dummyData]);
    setOpen(false);
    setText("Yearly")
  };
  useEffect(() => {
    todayHandler();
  }, []);
  return (
    <Card>
      <FlexLayout halign="end">
        <FlexChild>

          <Card>
            <ActionList
              open={open}
              activator={
                <Button
                  icon={<i className="fa-solid fa-chevron-down"></i>}
                  iconAlign="right"
                  onClick={() => setOpen(!open)}
                  type="Outlined"
                >
                  {text}
                </Button>
              }
              direction="left"
              onClose={function noRefCheck() {}}
              sections={[
                {
                  items: [
                    {
                      content: "Today",
                      onClick: () => todayHandler(),
                    },
                    {
                      content: "Monthly",
                      onClick: () => monthlyHandler(),
                    },
                    {
                      content: "Yearly",
                      onClick: () => yearlyHandler(),
                    },
                  ],
                },
              ]}
            />
          </Card>
        </FlexChild>
      </FlexLayout>
      <Linechart graphData={graphData} />
    </Card>
  );
};

export default CalenderGraph;

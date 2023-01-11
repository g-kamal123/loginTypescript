import { Button, Grid, Layout, Stack, Text } from "@shopify/polaris";
import React, { FC, useState } from "react";
import { ChevronRight, Facebook, LogOut, Menu } from "react-feather";
interface cProps {
  children: React.ReactNode;
}
const Di: FC<cProps> = (props) => {
    const [menuFlag,setMenuFlag] = useState<boolean>(true)
  return (
    <Layout>
      <Layout.Section>
        <div className="navBar">
          <Stack alignment="center" distribution="fill">
            <Stack
              alignment="center"
              distribution="leading"
              spacing="extraLoose"
            >
              <Text variant="heading3xl" as="h2">
                Cedcommerce
              </Text>
              <Button icon={<Menu size={18} color="white" />} plain onClick={()=>{
                setMenuFlag(!menuFlag)
              }}></Button>
            </Stack>
            <Stack distribution="trailing">
              <Button icon={<LogOut size={18} />}></Button>
            </Stack>
          </Stack>
        </div>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
            
            <div className="asideBar">
                <span className="btnIcon">
              <Button icon={<Facebook size={25} color="white"/>}></Button>
              </span>
              <span className="btnChevron">
              <Button icon={<ChevronRight size={25} color="white"/>}></Button>
              </span>
            </div>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 5, lg: 11, xl: 11 }}>
            <Stack vertical={true}>
              <div className="integration">
                <Text variant="bodyLg" as="span">
                  FB Integration/Users
                </Text>
                <hr />
              </div>
              {props.children}
            </Stack>
          </Grid.Cell>
        </Grid>
      </Layout.Section>
      <Layout.Section></Layout.Section>
    </Layout>
  );
};

export default Di;

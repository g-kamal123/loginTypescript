import {
    Alert,
    Button,
    Card,
    FlexChild,
    FlexLayout,
    PageHeader,
    TextStyles,
  } from "@cedcommerce/ounce-ui";
  import React, { useState } from "react";
  
  const Connect = () => {
    const [flag, setFlag] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);
    let interval: any;
    const connectHandler = () => {
      let web_window: any = window.open(
        "https://app.clickup.com/t/85zrggb2g",
        "",
        "toolbar=no,status=no,menubar=no,location=center,scrollbars=yes,top=200,left=250,resizable=no,height=400,width=500"
      );
      interval = setInterval(() => closeHandler(web_window), 1000);
    };
    const closeHandler = (fnc: any) => {
      if (fnc.closed) {
        clearInterval(interval);
        setFlag(false);
        setAlert(true);
      }
    };
    return (
      <>
        <Card cardType="Bordered">
          <PageHeader
            description="Page Description"
            title="Amazon Buy With Prime"
          />
        </Card>
        <div className="container">
          {alert && <Card>
          <Alert
        destroy={false}
        type="warning"
      >
        This is an alert message
      </Alert>
          </Card>}
          
          <Card title={"About this intgration"}>
            <TextStyles>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
              reiciendis mollitia tempora rem tenetur unde quae? Eligendi, enim.
              Porro suscipit hic sit reiciendis commodi ea iure possimus maiores.
              Assumenda, in!
            </TextStyles>
          </Card>
          <FlexLayout>
            <FlexChild desktopWidth="50" mobileWidth="20" tabWidth="50">
              <Card>
                <FlexLayout direction="vertical" spacing="loose" valign="start">
                  <Card title={"Connect Your amazon account"}>
                    <FlexLayout halign="start">
                      <FlexChild desktopWidth="20">
                      <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.8401 45.9775C36.4763 45.9775 46.7201 35.7338 46.7201 23.0975C46.7201 10.4613 36.4763 0.217529 23.8401 0.217529C11.2038 0.217529 0.960083 10.4613 0.960083 23.0975C0.960083 35.7338 11.2038 45.9775 23.8401 45.9775Z" fill="url(#paint0_linear_650_22989)"/>
  <defs>
  <linearGradient id="paint0_linear_650_22989" x1="23.9801" y1="46.42" x2="23.9801" y2="-46.4668" gradientUnits="userSpaceOnUse">
  <stop stop-color="#413BBC"/>
  <stop offset="1" stop-color="#A9A6E2"/>
  </linearGradient>
  </defs>
  </svg>
  
                      </FlexChild>
                      <FlexChild desktopWidth="66">
                      <TextStyles>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Nostrum maxime dolorem enim nihil numquam, sapiente
                        aspernatur error repudiandae
                      </TextStyles>
                      </FlexChild>
                      
                    </FlexLayout>
                  </Card>
                  <Card title={"Connect Your amazon account"}>
                    <FlexLayout halign="start">
                      <FlexChild desktopWidth="20">
                      <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.8401 45.9775C36.4763 45.9775 46.7201 35.7338 46.7201 23.0975C46.7201 10.4613 36.4763 0.217529 23.8401 0.217529C11.2038 0.217529 0.960083 10.4613 0.960083 23.0975C0.960083 35.7338 11.2038 45.9775 23.8401 45.9775Z" fill="url(#paint0_linear_650_22989)"/>
  <defs>
  <linearGradient id="paint0_linear_650_22989" x1="23.9801" y1="46.42" x2="23.9801" y2="-46.4668" gradientUnits="userSpaceOnUse">
  <stop stop-color="#413BBC"/>
  <stop offset="1" stop-color="#A9A6E2"/>
  </linearGradient>
  </defs>
  </svg>
  
                      </FlexChild>
                      <FlexChild desktopWidth="66">
                      <TextStyles>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Nostrum maxime dolorem enim nihil numquam, sapiente
                        aspernatur error repudiandae
                      </TextStyles>
                      </FlexChild>
                      
                    </FlexLayout>
                  </Card>
                  <Card title={"Connect Your amazon account"}>
                    <FlexLayout halign="start">
                      <FlexChild desktopWidth="20">
                      <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.8401 45.9775C36.4763 45.9775 46.7201 35.7338 46.7201 23.0975C46.7201 10.4613 36.4763 0.217529 23.8401 0.217529C11.2038 0.217529 0.960083 10.4613 0.960083 23.0975C0.960083 35.7338 11.2038 45.9775 23.8401 45.9775Z" fill="url(#paint0_linear_650_22989)"/>
  <defs>
  <linearGradient id="paint0_linear_650_22989" x1="23.9801" y1="46.42" x2="23.9801" y2="-46.4668" gradientUnits="userSpaceOnUse">
  <stop stop-color="#413BBC"/>
  <stop offset="1" stop-color="#A9A6E2"/>
  </linearGradient>
  </defs>
  </svg>
  
                      </FlexChild>
                      <FlexChild desktopWidth="66">
                      <TextStyles>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Nostrum maxime dolorem enim nihil numquam, sapiente
                        aspernatur error repudiandae
                      </TextStyles>
                      </FlexChild>
                      
                    </FlexLayout>
                  </Card>
                </FlexLayout>
              </Card>
            </FlexChild>
            <FlexChild desktopWidth="50" mobileWidth="20" tabWidth="50">
              <Card>
                  <Card cardType="Shadowed" media="https://i.imgur.com/1TqLoyq.png">
                  </Card>
              </Card>
            </FlexChild>
          </FlexLayout>
        </div>
        <Card>
          <FlexLayout>
              <FlexChild desktopWidth="66" tabWidth="66">
                  <Card title={"lorem djuscf jiswj djoisw dkoswadk do"}>
                      <TextStyles>
                          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, sit enim! Odio, molestias quia porro commodi fugiat.
                      </TextStyles>
                  </Card>
              </FlexChild>
              
              <FlexChild desktopWidth="33" tabWidth="33">
              <Card>
              <Button
          loading={flag}
          onClick={() => {
            setFlag(true);
            connectHandler();
          }}
        >
          {!flag && "connect Amazon"}
        </Button>
              </Card>
              </FlexChild>
          </FlexLayout>
        </Card>
      </>
    );
  };
  
  export default Connect;
  
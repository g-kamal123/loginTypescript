import { Alert, Button, Card } from "@cedcommerce/ounce-ui";
import React, { useState } from "react";

const Welcome = () => {
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
    <Card>
      <Button
        icon={flag && <i className="fa fa-spinner" aria-hidden="true"></i>}
        onClick={() => {
          setFlag(true);
          connectHandler();
        }}
      >
        {!flag && "connect"}
      </Button>
      {alert &&  <Alert
      destroy={false}
      type="warning"
    >
      This is an alert message
    </Alert>}
    </Card>
  );
};

export default Welcome;

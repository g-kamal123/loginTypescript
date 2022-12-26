import { Card, List, TextStyles } from "@cedcommerce/ounce-ui";
import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <Card>
      <h1>All Tasks</h1>
      <List>
        <TextStyles>
          <Link to={"/connect"}>Connect TAsk</Link>
        </TextStyles>
        <TextStyles>
          <Link to={"/graphs"}>Doughnut</Link>
        </TextStyles>
        <TextStyles>
          <Link to={"/listing"}>Listing</Link>
        </TextStyles>
      </List>
    </Card>
  );
};

export default Welcome;

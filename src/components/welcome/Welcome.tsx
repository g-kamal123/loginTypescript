import { Card, List, TextStyles } from "@cedcommerce/ounce-ui";
import React from "react";
import { Link } from "react-router-dom";
import StringHoc, { hcProps } from "../hoc/stringHoc/StringHoc";

const Welcome = (props:hcProps) => {
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
        <TextStyles>
          <Link to={"/faqs"}>FAQs</Link>
        </TextStyles>
        <TextStyles>
          <Link to={"/mapping"}>Attributes Mapping</Link>
        </TextStyles>
        <TextStyles>
          <Link to={"/multi"}>Multi-Level Select</Link>
        </TextStyles>
        <TextStyles>
          <Link to={"/queryBuilder"}>Query Builder</Link>
        </TextStyles>
        <TextStyles>
          <Link to={"/adminPanel"}>Admin Panel</Link>
        </TextStyles>
        <TextStyles>
          <Link to={"/comments"}>Social Media Comment</Link>
        </TextStyles>
        <TextStyles>
          <Link to={"/hoc"}>Hoc Component</Link>
        </TextStyles>
      </List>
      <h2>{props.name}</h2>
    </Card>
  );
};

export default StringHoc(Welcome);

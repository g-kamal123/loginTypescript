import { Card, FlexChild, FlexLayout } from "@cedcommerce/ounce-ui";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { DrawFilter } from "./drawFilter/DrawFilter";
import ListingGrid from "./listingGrid/ListingGrid";
import PaginationData from "./paginationData/PaginationData";
import RemoveSelect from "./removeSelect/RemoveSelect";
import Search from "./search/Searchbox";
import SortData from "./sortData/SortData";
import Tags from "./tags/Tags";

const Listing = () => {
  const store = useSelector((state: RootState) => state.grid);

  return (
    <Card title={"Product Listing"}>
      <FlexLayout spacing="loose" valign="center" halign="center">
        <FlexChild desktopWidth="50" tabWidth="50">
          <Search />
        </FlexChild>
        <FlexChild desktopWidth="50" tabWidth="50">
          <FlexLayout halign="end" spacing="loose" valign="center">
            <FlexChild>
              <DrawFilter />
            </FlexChild>
            <FlexChild>
              <SortData />
            </FlexChild>
          </FlexLayout>
        </FlexChild>
      </FlexLayout>
      <Tags />
      {store.rowkey.length > 0 && <RemoveSelect />}
      <ListingGrid />
      <PaginationData />
    </Card>
  );
};

export default Listing;

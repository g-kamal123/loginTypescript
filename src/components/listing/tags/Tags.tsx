import { Card, FlexLayout, Tag } from "@cedcommerce/ounce-ui";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRemoveTags } from "../../../store/slices/GridSlice";
import { RootState } from "../../../store/Store";
// type in1 = {
//     key:string,
//     value:string | number
// }
// type tagtype = {
//     selectedStatus:in1,
//     enteredInput:in1,
//     sort:in1
// }
const Tags: FC = () => {
  const store = useSelector((state: RootState) => state.grid);
  const dispatch = useDispatch();
  const [printTag, setPrintTag] = useState<any>({});
  useEffect(() => {
    let tags = {};
    if (store.appliedStatus)
      tags = {
        ...tags,
        appliedStatus: {
          key: "status:",
          value: store.appliedStatus,
          emptyKeys: "appliedStatus",
        },
      };
    if (store.enteredInput)
      tags = {
        ...tags,
        enteredInput: {
          key: "Title or Sku:",
          value: store.enteredInput,
          emptyKeys: "searchTag",
        },
      };
    if (store.sort)
      tags = {
        ...tags,
        sort: { key: "sort by:", value: store.sort, emptyKeys: "sort"},
      };
    setPrintTag(tags);
  }, [store.appliedStatus, store.enteredInput, store.sort]);
  const removeTagsHandler = (val: {}) => {
    dispatch(
      setRemoveTags({
        tags: val,
      })
    );
  };
  return (
    <Card>
      <FlexLayout spacing="loose">
        {Object.keys(printTag).length > 0 &&
          Object.keys(printTag).map((item) => (
            <Tag destroy={() => removeTagsHandler(printTag[item])} key={printTag[item]}>
              {`${printTag[item].key}${printTag[item].value}`}
            </Tag>
          ))}
      </FlexLayout>
    </Card>
  );
};

export default Tags;

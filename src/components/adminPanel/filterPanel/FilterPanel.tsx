import {
  Button,
  Card,
  Checkbox,
  Collapsible,
  Grid,
  Stack,
} from "@shopify/polaris";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColumns } from "../../../store/slices/AdminPanelSlice";
import { RootState } from "../../../store/Store";

const FilterPanel: FC = () => {
  const [flag, setFlag] = useState<boolean>(false);
  const store = useSelector((state: RootState) => state.adminPanel);
  const dispatch = useDispatch();
  const checkBoxHandler = (e: string) => {
    dispatch(
      setColumns({
        id: e,
      })
    );
  };

  return (
    <Card sectioned>
      <Card.Section>
        <Stack distribution="trailing" spacing="extraLoose">
          <span className="btnBlue animation">
            <Button
              onClick={() => {
                setFlag(!flag);
              }}
            >
              View Columns
            </Button>
          </span>
        </Stack>
        <Collapsible
          open={flag}
          id="basic-collapsible"
          transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
          expandOnPrint
        >
          <Grid>
            {store.headings.map((item, key) => (
              <Grid.Cell columnSpan={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}>
                <Checkbox
                  key={key}
                  label={item.title}
                  checked={item.checked}
                  onChange={() => checkBoxHandler(item.id)}
                  disabled={item.disabeled}
                />
              </Grid.Cell>
            ))}
          </Grid>
        </Collapsible>
      </Card.Section>
    </Card>
  );
};

export default FilterPanel;

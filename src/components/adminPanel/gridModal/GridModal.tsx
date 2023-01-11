import { Button, Card,  Grid, Link, Modal, Stack, Text } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { setAdminModal } from "../../../store/slices/AdminPanelSlice";
import { RootState } from "../../../store/Store";

function GridModal() {
  const store = useSelector((state: RootState) => state.adminPanel);
  const dispatch = useDispatch();

  return (
    <div style={{ height: "max-content", width: "max-content" }}>
      <Modal
        large
        open={store.adminModal}
        onClose={() => {
          dispatch(setAdminModal({ data: {} }));
        }}
        title="User Information"
      >
        <Modal.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 8, xl: 8 }}>
              <Card sectioned>
                <Text variant="heading2xl" as="h3">
                  User Information
                </Text>
                <br />
                {Object.keys(store.modalData).length > 0 &&
                  Object.keys(store.modalData.user_details).map((item) => (
                    <Grid>
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                      >
                        <Text variant="headingLg" as="h5">
                          {item === "full_name" && "Name"}
                          {item === "mobile" && "Contact Number"}
                          {item === "primary_time_zone" && "Time Zone"}
                        </Text>
                      </Grid.Cell>
                      <Grid.Cell
                        columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                      >
                        <Text variant="headingLg" as="h5">
                          {item === "full_name" &&
                            store.modalData.user_details[item]}
                          {item === "mobile" &&
                            store.modalData.user_details[item]}
                          {item === "primary_time_zone" &&
                            store.modalData.user_details[item]}
                        </Text>
                      </Grid.Cell>
                      <br />
                    </Grid>
                  ))}
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 4 }}>
              <Text variant="heading2xl" as="h3">
                Account Information
              </Text>
              <br />
                  <Card sectioned>
                    <Card.Section>
                    <Text variant="headingLg" as="h5">
                      UserName
                    </Text>
                    <Link>
                    {store?.modalData?.username}
                    </Link>
                    </Card.Section>
                    <Card.Section>
                    <Text variant="headingLg" as="h5">
                      Contact
                    </Text>
                    <Link>
                    {store?.modalData?.email}
                    </Link>
                    </Card.Section>
                    <Card.Section>
                    <Text variant="headingLg" as="h5">
                      Created At
                    </Text>
                    {store?.modalData?.created_at}
                    </Card.Section>
                    <Card.Section>
                    <Text variant="headingLg" as="h5">
                      Updated At
                    </Text>
                    {store?.modalData?.updated_at}
                    </Card.Section>
                  </Card>
                  
            </Grid.Cell>
          </Grid>
          <hr />
          <Stack distribution="trailing">
            <span className="btnBlue">
                <Button onClick={()=>{dispatch(setAdminModal({ data: {} }))}}>
                    Close
                </Button>
            </span>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}
export default GridModal;

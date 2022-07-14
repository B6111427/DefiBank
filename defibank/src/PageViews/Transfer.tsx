import {
  Container,
  Card,
  Row,
  Text,
  Grid,
  Input,
  Button,
} from "@nextui-org/react";
import { SunIcon } from "../Icons";

export default function Tranfer() {
  return (
    <Container lg>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12}>
          <Text h4 css={{ lineHeight: "$xs" }}>
            Tranfer
          </Text>
        </Grid>
        <Grid xs={12}>
          <Card isHoverable css={{ $$cardColor: "$colors$secondary" }}>
            <Card.Body>
              <Grid xs={12} justify="flex-end">
                <Button disabled>
                  Account Name:
                </Button>
                <Input
                  clearable
                  fullWidth={true}
                  helperText="Excelent username"
                  placeholder="Enter Your Account Name"
                />
              </Grid>
              <Grid xs={12} justify="flex-end">
              <Button disabled>
                  Amount:
                </Button>
                <Input
                  clearable
                  fullWidth={true}
                  helperText="Excelent username"
                  labelRight="DAI"
                  placeholder="Enter Your Account Name"
                />
              </Grid>
              <Grid xs={12} justify="flex-end">
                <Button color="gradient" ghost>
                  Create
                </Button>
              </Grid>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  );
}

import {
  Container,
  Card,
  Row,
  Text,
  Grid,
  Button,
  Input,
} from '@nextui-org/react'

export default function Home() {
  return (
    <Container lg>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12}>
          <Text h4 css={{ lineHeight: '$xs' }}>
            My Accounts:
          </Text>
        </Grid>
        <Grid xs={12}>
          <Card css={{ $$cardColor: '$colors$backgroundContrast' }}>
            <Card.Body>
              <Grid.Container gap={2} justify="center">
                <Grid xs={12}>
                  <Input
                    fullWidth
                    bordered
                    initialValue="Somchay SCB10X"
                    labelLeft="Account Name"
                    readOnly
                  />
                </Grid>
                <Grid xs={12}>
                  <Input
                    fullWidth
                    bordered
                    initialValue="0.00"
                    labelLeft="Balance"
                    readOnly
                    labelRight="DAI"
                  />
                </Grid>
              </Grid.Container>
            </Card.Body>

            <Card.Footer>
              <Button.Group color="gradient" ghost css={{ w: '100%' }}>
                <Button css={{ w: '100%' }}>Deposit</Button>
                <Button css={{ w: '100%' }}>Withdraw</Button>
                <Button css={{ w: '100%' }}>Transfer</Button>
              </Button.Group>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card css={{ $$cardColor: '$colors$backgroundContrast' }} isPressable>
            <Card.Body>
              <Text h6 size={15} css={{ m: 0 }}>
                + Create Bank Account
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  )
}

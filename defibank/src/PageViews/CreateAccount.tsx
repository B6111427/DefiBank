import { Button, Card, Grid, Input, Text } from '@nextui-org/react'

export default function CreateAccount() {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12}>
        <Text h4 css={{ lineHeight: '$xs' }}>
          Create Your bank account
        </Text>
      </Grid>
      <Grid xs={12}>
        <Card css={{ $$cardColor: '$colors$backgroundContrast' }}>
          <Card.Body>
            <Grid xs={12} justify="flex-end">
              Account Number
              <Input
                clearable
                fullWidth={true}
                labelLeft="Account Name"
                helperText="Excelent username"
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
  )
}

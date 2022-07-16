import { Button, Card, Grid, Input, Popover, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWeb3 } from '../hooks/useWeb3'
import { AccountBalance, TokenInfo } from '../types'

export default function Home() {
  const {
    getBankAccountsListByOwner,
    getAccount,
    createAccount,
    getTokenInfo,
  } = useWeb3()
  const [accountList, setAccountList] = useState<AccountBalance[]>([])
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const account = await getAccount()
      if (account) {
        const res = await getBankAccountsListByOwner(account)
        setAccountList(res)
        setTokenInfo(await getTokenInfo())
      }
    })()
  }, [])

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12}>
        <Text h4 css={{ lineHeight: '$xs' }}>
          My Accounts:
        </Text>
      </Grid>
      {accountList.map((account, index) => {
        return (
          <Grid xs={12} key={index}>
            <Card css={{ $$cardColor: '$colors$backgroundContrast' }}>
              <Card.Body>
                <Grid.Container gap={2} justify="center">
                  <Grid.Container gap={2} justify="center">
                    <Grid xs={3}>
                      <Button light disabled color="warning" auto>
                        Bank Account Name
                      </Button>
                    </Grid>
                    <Grid xs={9}>
                      <Input
                        fullWidth
                        bordered
                        value={account.name ?? 'Somchay SCB10X'}
                        readOnly
                      />
                    </Grid>
                  </Grid.Container>
                  <Grid.Container gap={2} justify="center">
                    <Grid xs={3}>
                      <Button light disabled color="warning" auto>
                        Total Balance
                      </Button>
                    </Grid>
                    <Grid xs={9}>
                      <Input
                        fullWidth
                        bordered
                        value={account.balances ?? 0}
                        readOnly
                        labelRight={tokenInfo?.symbol}
                      />
                    </Grid>
                  </Grid.Container>
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
        )
      })}

      <Grid xs={12}>
        <Card
          css={{ $$cardColor: '$colors$backgroundContrast' }}
          isPressable
          onClick={async () => {
            navigate('/create')
          }}
        >
          <Card.Body>
            <Text h6 size={15} css={{ m: 0 }}>
              + Create Bank Account
            </Text>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  )
}

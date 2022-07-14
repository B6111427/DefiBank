import {
  Button,
  Card,
  Container,
  Grid,
  Row,
  Switch,
  Text,
  useTheme,
} from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'
import { Link } from 'react-router-dom'
import { MoonIcon, SunIcon } from '../Icons'

export default function Header() {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()

  return (
    <Container xl>
      <Grid.Container gap={2} justify="center" alignItems="center">
        <Grid xs={8} alignItems="center">
          <Text
            h2
            css={{
              textGradient:
                '90deg, $purple600 30%, $gray600 35%, $blue600 50%, $blue600 70%, $yellow600 95%',
            }}
            weight="bold"
          >
            10XBank
          </Text>

          <nav>
            {' '}
            <Link to="/">Home</Link> | <Link to="create">Create Account</Link> |{' '}
            <Link to="transfer">Tranfer</Link>{' '}
          </nav>
        </Grid>
        <Grid xs={4} justify="space-between">
          <Switch
            checked={isDark}
            size="lg"
            iconOn={<SunIcon filled />}
            iconOff={<MoonIcon filled />}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          />
          <Button auto color="gradient" rounded bordered>
            CONNECT WALLET
          </Button>
        </Grid>
      </Grid.Container>
    </Container>
  )
}

import { Container, Grid } from '@nextui-org/react'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import CreateAccount from './PageViews/CreateAccount'
import Home from './PageViews/Home'
import Tranfer from './PageViews/Transfer'

function App() {
  return (
    <Container lg css={{ background: '$background' }}>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<CreateAccount />} />
        <Route path="transfer" element={<Tranfer />} />
      </Routes>
    </Container>
  )
}
export default App

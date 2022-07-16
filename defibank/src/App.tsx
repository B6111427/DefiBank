import { Container, Grid } from '@nextui-org/react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import CreateAccount from './pageViews/CreateAccount'
import Home from './pageViews/Home'
import Tranfer from './pageViews/Transfer'

function App() {
  return (
    <Container md css={{ background: '$background' }}>
      <Header></Header>
      <Container sm>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="create" element={<CreateAccount />} />
          <Route path="transfer" element={<Tranfer />} />
        </Routes>
      </Container>
    </Container>
  )
}
export default App

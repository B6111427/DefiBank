import {
  Container,
  Switch,
  useTheme,
  Text,
  Card,
  Grid,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { Route, Routes } from "react-router-dom";
import Home from "./PageViews/Home";

function App() {
  return (
    <Container xl css={{ background: "$background" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Container>
  );
}
export default App;

function About() {
  return <h2>About</h2>;
}

import { Card, Container, Grid, Switch, Text, useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";

export default function Header() {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  type Props = {
    text: String;
  };
  const MockItem = ({ text }: Props) => {
    return (
      <Card css={{ h: "$24", $$cardColor: "$colors$primary" }}>
        <Card.Body>
          <Text h6 size={15} color="white" css={{ mt: 0 }}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container xl>
      <Grid.Container gap={2} justify="center">
        <Grid xs={9}>
          <MockItem text="1 of 3" />
        </Grid>
        <Grid xs={3}>
          <MockItem text="3 of 3" />
        </Grid>
      </Grid.Container>
      <Text
        h1
        size={60}
        css={{
          textGradient: "90deg, $purple600 10%, $blue700 50%",
        }}
        weight="bold"
      >
        10XBank
      </Text>
      <Switch
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      />
    </Container>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  useMantineTheme,
  Container,
} from "@mantine/core";
import { GoogleButton } from "../components/GoogleButton";
import { useAuth } from "../hooks/AuthProvider";

export function AuthenticationForm(props: PaperProps) {
  const theme = useMantineTheme();
  const [type, toggle] = useToggle(["login", "register"]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      company: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    setError(null);

    try {
      if (type === "login") {
        await login({
          email: values.email,
          password: values.password,
        });
      } else {
        console.log("register", values);
        await register(values);
      }
      navigate("/");
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      fluid
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.gray[0],
      }}
    >
      <Paper
        radius="md"
        p="xl"
        withBorder
        {...props}
        style={{ width: "1000px", maxWidth: 500 }}
      >
        <Text size="lg" fw={500}>
          Welcome to your Quotation Portal, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === "register" && (
              <Stack>
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  radius="md"
                />
                <TextInput
                  label="Company"
                  placeholder="Your company"
                  value={form.values.company}
                  onChange={(event) =>
                    form.setFieldValue("company", event.currentTarget.value)
                  }
                  radius="md"
                />
              </Stack>
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@email.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            {error && (
              <Text color="red" size="sm">
                {error}
              </Text>
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button
              type="submit"
              radius="xl"
              loading={isLoading}
              style={{
                backgroundColor: theme.colors.secondary[0],
                color: "black",
              }}
            >
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

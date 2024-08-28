"use client";
import { login } from "./actions";
import { useState } from "react";
import { useTransition } from "react";
import { FaGoogle } from "react-icons/fa";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Icon,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    startTransition(async () => {
      const response = await login(formData);

      if (response.error) {
        if (response.error.includes("fetch failed")) {
          setError("Check you internet connection");
        } else {
          setError(response.error);
        }
      } else {
        window.location.href = "/dashboard";
      }
    });
  };

  return (
    <HStack h="100vh">
      <Box
        flex="1"
        bg="gray.100"
        display={{ base: "none", md: "block" }}
        className="box"
      ></Box>

      <Box
        flex="1"
        p={8}
        display="flex"
        alignItems="center"
        justifyContent="center"
        pt="8rem"
      >
        <VStack spacing={6} w="full" maxW="md">
          <Heading as="h3" size="lg" color="#006bb2">
            Log in to &#34;cxors&#34; a link :)
          </Heading>

          {error && (
            <Text fontSize="l" color="red">
              {error}
            </Text>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="button"
              formAction={login}
              disabled={isPending}
              data-id="login"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <Text>or</Text>
          <Button w="full" leftIcon={<Icon as={FaGoogle} />}>
            Sign in with Google
          </Button>
          <Text>
            Don’t have an account?{" "}
            <Link href="/signup" color="blue.500">
              Sign up
            </Link>
          </Text>
        </VStack>
      </Box>
    </HStack>
  );
};

export default Login;

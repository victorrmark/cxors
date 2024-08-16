"use client";
import { useState } from "react";
import { signup } from "../login/actions";

import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("email", email);
    formData.append("password", password);

    const response = await signup(formData);

    if (response.error) {
      if (response.error.includes("rate limit")) {
        setError("Too many requests. Please try again later.");
      } else {
        setError(response.error);
      }
      setIsSubmitting(false);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <HStack h="100vh">
      <Box
        flex="1"
        p="2rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        pt="8rem"
      >
        <VStack spacing={6} w="full" maxW="md">
          <Heading as="h2" size="xl" color="#006bb2">
            Sign Up
          </Heading>

          {error && (
            <Text fontSize="l" color="red">
              {error}
            </Text>
          )}

          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="name">Email</FormLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                mb={4}
              />

              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb={4}
              />

              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pr="4.5rem"
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    icon={isPasswordVisible ? <ViewOffIcon /> : <ViewIcon />}
                    aria-label={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>

              <FormLabel htmlFor="confirm-password" mt={4}>
                Confirm Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  id="confirm-password"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  pr="4.5rem"
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    icon={
                      isConfirmPasswordVisible ? <ViewOffIcon /> : <ViewIcon />
                    }
                    aria-label={
                      isConfirmPasswordVisible
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              className="button"
              type="submit"
              colorScheme="blue"
              mt={4}
              isDisabled={isSubmitting || password.length < 6}
              isLoading={isSubmitting}
              loadingText="Signing in..."
            >
              Signup
            </Button>
          </form>

          <Text>or</Text>
          <Button w="full" leftIcon={<Icon as={FaGoogle} />}>
            Sign up with Google
          </Button>
          <Text>
            Already have an account?{" "}
            <Link href="/login" color="blue.500">
              Sign in
            </Link>
          </Text>
        </VStack>
      </Box>

      <Box
        as="div"
        flex="1"
        bg="gray.100"
        display={{ base: "none", md: "block" }}
        className="box sign-up"
      ></Box>
    </HStack>
  );
};

export default SignupPage;

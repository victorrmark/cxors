"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Heading,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const supabase = createClient();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (data) {
      toast({
        title: "Password changed!",
        description: "Password reset successfull",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/login");
    }

    if (error) {
      toast({
        title: "Password Reset Failed.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justify="center" align="center" height="100vh" bg="gray.100">
      <Box
        bg="white"
        p={8}
        boxShadow="md"
        rounded="lg"
        width="100%"
        maxWidth="400px"
        mx="auto"
      >
        <Heading size="lg" textAlign="center" mb={4}>
          Reset Password
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="password" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </FormControl>

            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </FormControl>

            {error && (
              <Text textAlign="center" color="red.500">
                {error}
              </Text>
            )}

            <Button type="submit" colorScheme="blue" bg="#006bb2">
              Reset Password
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default ResetPasswordForm;

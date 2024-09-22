"use client";

import { createClient } from "../../utils/supabase/client";
import { useEffect, useState } from "react";
import { VStack, Heading, Text, Button, useToast, Box, HStack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";


const ForgotPassword = () => {
  const [usersEmails, setUsersEmails] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();
  const toast = useToast();
  const router = useRouter()

  useEffect(() => {
    const fetchEmails = async () => {
      const { error, data } = await supabase.from("users").select("email");

      if (error) {
        console.log(error);
      } else {
        const emailArray = data.map((user) => user.email);
        setUsersEmails(emailArray);
      }
    };

    fetchEmails();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    if (!usersEmails.includes(email)) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const { error } = await supabase
      .auth
      .resetPasswordForEmail(email, {
        redirectTo: `https://cxors.vercel.app/resetpassword`
      });

    if (error) {
      setIsLoading(false);
      toast({
        title: "Reset Error.",
        description: "Error sending reset link",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setError(false);
      setEmail("");
      setIsLoading(false);
      toast({
        title: "Reset Success.",
        description: "Check your email to reset Passowrd",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <HStack h="100vh">
        <Box
          flex="1"
          bg="gray.100"
          display={{ base: "none", md: "block" }}
          className="resetPassword"
        ></Box>
    <Box
      flex="1"
      p={8}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >

    <VStack w="full" maxW="md">
      <Heading as="h3" size="lg" color="#006bb2" alignSelf="flex-start">
        Forgot Password
      </Heading>
      <Text mb="15px">
        Enter your email and we&#34;ll send a link to reset your password
      </Text>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          data-id="input-feild"
          id="email"
          name="email"
          className="input"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && (
          <Text mt="5px" color="red" data-id="err">
            We cannot find your email
          </Text>
        )}

        <button
          className="button"
          style={{ marginTop: "20px", marginBottom: "15px" }}
          disabled={isLoading || email.length < 1}
          data-id="submit"
        >
          Submit
        </button>
      </form>

      <Button
        leftIcon={<ArrowBackIcon />}
        color="gray.500"
        _hover={{ color: "#006bb2", cursor: "pointer" }}
        variant="link"
        onClick={() => router.push("/login")}
        data-id="go-back"
      >
        Back to Login
      </Button>
    </VStack>
    </Box>
    </HStack>

  );
};

export default ForgotPassword;

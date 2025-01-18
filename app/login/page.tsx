"use client";
import { login } from "./actions";
import { useState, useEffect } from "react";
import { useTransition } from "react";
import { FcGoogle } from "react-icons/fc";

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [loading, isLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        isLoading(true);
        window.location.href = "/dashboard";
      }
    });
  }, []);

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
        isLoading(true);
        window.location.href = "/dashboard";
      }
    });
  };

  const loginWithGoogle = async () => {
    // event.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://cxors.vercel.app/dashboard/home",
        queryParams: {
          prompt: "consent",
        },
      },
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
      >
        <VStack spacing={6} w="full" maxW="md">
          <Heading as="h3" size="lg" color="#006bb2">
            Log in to &#34;cxors&#34; a link :)
          </Heading>

          {error && (
            <Text fontSize="l" color="red" data-id="invalid-login">
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

            <Text
              fontSize="md"
              textAlign="right"
              mt="5px"
              color="gray.500"
              onClick={() => router.push("/forgotpassword")}
              _hover={{ color: "#006bb2", cursor: "pointer" }}
            >
              Forgot Password
            </Text>

            <button
              className="button"
              formAction={login}
              disabled={isPending || loading}
              data-id="login"
            >
              {isPending || loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <Text>or</Text>
          <button
            className={`google-button ${loading ? "loading" : ""}`}
            onClick={loginWithGoogle}
            disabled={loading}
          >
            <FcGoogle />
            Sign in with Google
          </button>
          <Text>
            Don’t have an account?{" "}
            <Link href="/signup" color="blue.500">
              Sign up
            </Link>
          </Text>
        </VStack>

        {/* {resetPassword && (
          <ForgotPassword setResetPassword={setResetPassword}/>
        )} */}
      </Box>
    </HStack>
  );
};

export default Login;

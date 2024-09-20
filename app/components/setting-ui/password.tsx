"use client";
import { useUserContext } from "../../context/userContext";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
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

const PasswordSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();
  const { user } = useUserContext();
  const toast = useToast()

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user?.email as string,
      password: currentPassword,
    });

    if (signInError) {
      setError("Current password is incorrect");
      setIsLoading(false)
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      setIsLoading(false)
      return;
    }

    if (newPassword.length < 6) {
        setError('Password must be at least 6 characters long' )
        setIsLoading(false)
        return
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setError("Error updating password");
      setIsLoading(false)
    } else {
      setError("");
      setCurrentPassword("");
      setConfirmPassword("")
      setNewPassword("")
      toast({
        title: 'Password Changed.',
        description: "Your password change is successful.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setIsLoading(false)
    }
  };

  return (
      <Flex>
        <Box boxShadow="md" width="100%" padding={2}>
          <Text fontSize="xl" fontWeight="bold" mb={2} >
            Change Password
          </Text>

          <form onSubmit={handleChangePassword}>
            <Stack spacing={5}>
              <FormControl id="currentPassword" isRequired>
                <FormLabel>Current Password</FormLabel>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  data-id="current-pw"
                />
              </FormControl>

              <FormControl id="newPassword" isRequired>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  data-id="new-pw"
                />
              </FormControl>

              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  data-id="confirm-pw"
                />
              </FormControl>

              {error && <Text color="red.500" mb={3} data-id="err">
                {error}
              </Text> }

              <Button
                type="submit"
                colorScheme="blue"
                bg="#006bb2"
                maxWidth="200px"
                isDisabled={isLoading}
                data-id="change-pw"
              >
                {isLoading ? "Changing Password ..." : "Change Password"}
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
  );
};

export default PasswordSettings;

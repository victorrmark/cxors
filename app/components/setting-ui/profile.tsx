"use client";
import { useUserContext } from "../../context/userContext";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

const ProfileSettings = () => {
  const { user } = useUserContext();

  const [fetchedName, setFetchedName] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameMatch, setNameMatch] = useState(false);

  const supabase = createClient();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setFetchedName(user?.user_metadata.display_name ?? "");
      setDisplayName(user?.user_metadata.display_name ?? "");
      setEmail(user?.email as string);
    }

  }, [user]);

  useEffect(() => {
    setNameMatch(displayName !== fetchedName);
  }, [displayName, fetchedName]);

  const handleChangeName = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { display_name: displayName },
      });

      if (updateError) {
        throw updateError;
      }

      setError("");
      toast({
        title: "Name Update",
        description: "Your display name has been updated!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      window.location.reload();

    } catch (err) {
      console.error(err);
      setError("Error updating display name");

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box boxShadow="md" width="100%" padding={2} mb="30px">
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          Profile Settings
        </Text>

        <form onSubmit={handleChangeName}>
          <Stack spacing={3}>
            <FormControl id="displayName">
              <FormLabel>Display Name</FormLabel>
              <Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                data-id="display-name"
              />
            </FormControl>

            {error && (
              <Text color="red.500" mb={3}>
                {error}
              </Text>
            )}

            <Button
              type="submit"
              colorScheme="blue"
              bg="#006bb2"
              maxWidth="200px"
              isDisabled={!nameMatch || isSubmitting}
              data-id="change-name"
            >
              {isSubmitting ? "updating..." : "Update display name"}
            </Button>
          </Stack>
        </form>
      </Box>

      <Box boxShadow="md" width="100%" padding={2} mb="30px">
        <Text fontSize="md" fontWeight="bold" mb={2}>
          Email Address
        </Text>
        <Text fontSize="md" data-id="user-email">{email}</Text>
      </Box>
    </>
  );
};

export default ProfileSettings;

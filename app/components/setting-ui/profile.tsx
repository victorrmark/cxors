"use client";
import { useUserContext } from "../../context/userContext";
import { useState, useEffect } from "react";
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

const ProfileSettings = () => {
  const { user } = useUserContext();

  const [fetchedName, setFetchedName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();
  const toast = useToast();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setFetchedName(data.user.user_metadata.display_name);
        setDisplayName(data.user.user_metadata.display_name);
        setEmail(data.user.email as string);
      }
    });
  }, []);

  useEffect(() => {
    setIsLoading(displayName !== fetchedName);
  }, [displayName, fetchedName]);

  const handleChangeName = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const { error: updateError } = await supabase.auth.updateUser({
      data: { display_name: displayName },
    });

    if (updateError) {
      setError("Error updating display name");
      setIsSubmitting(false);
    } else {
      setError("");
      toast({
        title: "Name Update.",
        description: "Your display name has been updated!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
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
              isDisabled={!isLoading}
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
        <Text fontSize="md">{email}</Text>
      </Box>
    </>
  );
};

export default ProfileSettings;

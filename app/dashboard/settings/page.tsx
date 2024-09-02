"use client";
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
} from "@chakra-ui/react";
import dynamic from "next/dynamic";

// Client Components:
const Profile = dynamic(() => import("../../components/setting-ui/profile"));
const Password = dynamic(() => import("../../components/setting-ui/password"));

const UpdateUserForm = () => {
  return (
    <div>
      <Text fontSize="3xl" fontWeight="bold" mb={3}>
        Settings
      </Text>
      <Stack spacing='30px'>
        <Profile />
        <Password />
      </Stack>
    </div>
  );
};

export default UpdateUserForm;

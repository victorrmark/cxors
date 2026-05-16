"use client";

import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast
} from "@chakra-ui/react";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { useTransition } from "react";
import { logout } from "@/app/actions/authActions";
import Image from "next/image";

interface UserDropdownProps {
  email: string;
  userName: string;
  avatar?: string | null;
}

export default function UserDropdown({
  email,
  userName,
  avatar,
}: UserDropdownProps) {
  const initial = userName?.charAt(0).toUpperCase();
  const [isPending, startTransition] = useTransition();
  const toast = useToast();

  const handleLogout = () => {
    startTransition(async () => {
      const error = await logout();
      if (error) {
        toast({
          title: "Error",
          description: "Failed to logout.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Box _hover={{ bg: "gray.50" }} p={1}>
      <Menu>
        <MenuButton as={Box} data-id="open-logout">
          <Flex alignItems="center" gap="2">
            {avatar ? (
              <Image
                src={avatar}
                alt="User Avatar"
                width={50}
                height={50}
                className="avatar"
              />
            ) : (
              <Box
                as="span"
                borderRadius="full"
                bg="blue.600"
                color="white"
                // px={4}
              // py={2}
              fontWeight="bold"
              mr={2}
              className="avatar-placeholder"
            >
              {initial}
            </Box>)}

            
            <Box as="span" display={{ base: "none", md: "block" }}>
              <Box display="flex" alignItems="center" gap="5px">
                <Box as="span">
                  <Text fontWeight="bold">{userName}</Text>
                  <Text>{email}</Text>
                </Box>
                <Box as="span">
                  <FiChevronDown />
                </Box>
              </Box>
            </Box>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={<FiLogOut />}
            onClick={handleLogout}
            isDisabled={isPending}
            data-id="logout"
          >
            {isPending ? "Logging out..." : "Logout"}
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}

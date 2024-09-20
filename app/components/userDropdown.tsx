"use client";

import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { useTransition } from "react";
import { logout } from "../login/actions";

interface UserDropdownProps {
  email: string;
  userName: string;
}

export default function UserDropdown({ email, userName }: UserDropdownProps) {
  const initial = email?.charAt(0).toUpperCase();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <Box _hover={{ bg: "gray.50" }} p={1}>
      <Menu>
        <MenuButton as={Box} data-id="open-logout">
          <Flex alignItems="center" gap="2">
            <Box
              as="span"
              borderRadius="full"
              bg="blue.600"
              color="white"
              px={3}
              py={1}
              fontWeight="bold"
              mr={2}
            >
              {initial}
            </Box>
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

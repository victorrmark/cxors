import { useUserContext } from '../context/userContext';
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import logo from "../../public/logo.png";
import Image from "next/image";
import { greet, date } from "./greetings";

import UserDropdown from "./userDropdown";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  const { user } = useUserContext();

  
  const userEmail = user?.email as string;

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={4}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <IconButton
        size="md"
        display={{ base: "block", md: "none" }}
        icon={<HamburgerIcon />}
        aria-label="Open Sidebar"
        onClick={onOpenSidebar}
      />
      <Box as="span" display={{ base: "none", md: "block" }}>
        <Text fontWeight="bold">{greet()}</Text>
        <Text>{date()}</Text>
      </Box>
      <Box as="span"display={{ base: "block", md: "none" }}>
        <Image src={logo} alt="Logo" width={100} height={100} />
      </Box>
      <UserDropdown email={userEmail} />
    </Flex>
  );
}

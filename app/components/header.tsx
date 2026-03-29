import { useUserContext } from "../context/userContext";
import { useDateContext } from "../context/dateContext";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import logo from "../../public/logo.png";
import Image from "next/image";
import UserDropdown from "./userDropdown";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  const { user } = useUserContext();
  const { greeting: greetings, date: currentDate } = useDateContext();

  const userEmail = user?.email as string;
  const userName = user?.user_metadata.display_name || ("User" as string);

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      p={4}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="fixed"
      top="0"
      right="0"
      width="100%"
      zIndex={1}
      pl={{base:"20px", md: "270px"}}
    >
      <IconButton
        size="md"
        display={{ base: "block", md: "none" }}
        icon={<HamburgerIcon />}
        aria-label="Open Sidebar"
        onClick={onOpenSidebar}
      />
      <Box as="span" display={{ base: "none", md: "block" }}>
        <Box display="flex"  gap={1}>
          {greetings === "Good Morning," && <p>⛅</p>}
          {greetings === "Good Afternoon," && <p>☀️</p>}
          {greetings === "Good Evening," && <p>🌇</p>}

          <Box >
            <Text fontWeight="bold">
              {greetings} {userName.split(" ")[0]}!
            </Text>
            <Text>{currentDate}</Text>
          </Box>
        </Box>
      </Box>
      
      <UserDropdown email={userEmail}  userName={userName}/>
    </Flex>
  );
}

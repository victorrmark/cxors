import { useUserContext } from "../context/userContext";
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
  let greetings = greet();

  const userEmail = user?.email as string;
  const userName = user?.user_metadata?.display_name || ("User" as string);

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
              {greetings}
            </Text>
            <Text>{date()}</Text>
          </Box>
        </Box>
      </Box>
      <Box as="span" display={{ base: "block", md: "none" }}>
        <Image src={logo} alt="Logo" width={80} style={{ height: 'auto' }} />
      </Box>
      <UserDropdown email={userEmail}  userName={userName}/>
    </Flex>
  );
}

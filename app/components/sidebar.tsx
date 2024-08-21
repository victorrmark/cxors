import logo from "../../public/logo.png";
import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  DrawerCloseButton,
  VStack,
  DrawerBody,
  DrawerHeader,
} from "@chakra-ui/react";
import Image from 'next/image'
import {
  FiHome,
  FiLink,
  FiSettings,
  FiGrid,
  FiMenu,
  FiX,
} from "react-icons/fi";
import NavItem from "./navitems";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarItems = [
    { label: "Home", icon: FiHome, href: "/dashboard/home" },
    { label: "Links", icon: FiLink, href: "/dashboard/links" },
    { label: "QR Code", icon: FiGrid, href: "/dashboard/qrcode" },
    { label: "Settings", icon: FiSettings, href: "/dashboard/settings" },
  ];

  return (
    <>
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        h="100%"
        bg="#006bb2"
        w="250px"
        transition="width 0.2s"
        display={{ base: "none", md: "block" }}
        boxShadow="md"
        zIndex="100"
      >
        <Flex direction="column" h="100%" /*justifyContent="space-between"*/>
          <Box p={7} bg="white" borderBottom="1px solid" borderColor="gray.200" >
            <Image src={logo} alt="Logo" width={100} style={{ height: 'auto' }} />
          </Box>
          <Box>
            <VStack spacing={4} alignItems="start" p={4}>
              {sidebarItems.map((item) => (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </VStack>
          </Box>
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent bg="#006bb2">
          <DrawerHeader>
            <DrawerCloseButton color="white" />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} alignItems="start">
              {sidebarItems.map((item) => (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

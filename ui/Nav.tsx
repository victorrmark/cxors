"use client";
import Image from "next/image";
import logo from "../public/logo.png";

import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  Spacer,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      bg="white"
      boxShadow="md"
      zIndex="10"
      px={{ base: "20px", lg: "150px" }}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Image src={logo} alt="Logo" width={100} style={{ height: 'auto' }}  />
        </Flex>

        <Spacer />

        <IconButton
          size="md"
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={onOpen}
        />

        <Flex
          alignItems="center"
          gap={4}
          display={{ base: "none", md: "flex" }}
        >
          <Link
            href="#features"
            fontSize="md"
            fontWeight="medium"
            color="#006bb2"
          >
            Features
          </Link>
          <Link href="#how-to-use" fontSize="md" fontWeight="medium" color="#006bb2">
            How to Use
          </Link>
          <Link href="#faq" fontSize="md" fontWeight="medium" color="#006bb2">
            FAQ
          </Link>
          <Link href="/login">
            <Button
              variant="link"
              fontSize="md"
              fontWeight="medium"
              color="#006bb2"
            >
              Log In
            </Button>
          </Link>
          <Button
            as="a"
            href="/signup"
            bg="#006bb2"
            color="white"
            _hover={{ bg: "#005a93" }}
            data-id="signup"
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack alignItems="center" spacing={4}>
              <Link
                href="#features"
                fontSize="md"
                fontWeight="medium"
                color="#006bb2"
              >
                Features
              </Link>

              <Link
                href="#how-to-use"
                fontSize="md"
                fontWeight="medium"
                color="#006bb2"
              >
                How to Use
              </Link>
              <Link
                href="#faq"
                fontSize="md"
                fontWeight="medium"
                color="#006bb2"
              >
                FAQ
              </Link>
              <Link href="/login" w="full">
                <Button
                  w="full"
                  variant="link"
                  fontSize="md"
                  fontWeight="medium"
                  color="#006bb2"
                >
                  Log In
                </Button>
              </Link>
              <Button
                as="a"
                href="/signup"
                bg="#006bb2"
                color="white"
                _hover={{ bg: "#005a93" }}
                w="full"
              >
                Sign Up
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;

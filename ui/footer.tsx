"use client"

import React from 'react';
import { Box, Text, HStack, Link, Icon } from '@chakra-ui/react';
import { FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as="footer" py={8} bg="gray.100" textAlign="center">
      <Text color="gray.600" mb={4}>
        &copy; {new Date().getFullYear()} cxors. All rights reserved.
      </Text>
      <HStack spacing={4} justify="center" >
        <Link href="https://twitter.com/victorrmark" isExternal>
          <Icon as={FaTwitter} w={6} h={6} color="#006bb2" />
        </Link>
        <Link href="https://github.com/victorrmark" isExternal>
          <Icon as={FaGithub} w={6} h={6} color="#006bb2" />
        </Link>
      </HStack>
    </Box>
  );
};

export default Footer;

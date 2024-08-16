"use client";

import { Box, Heading, Text, VStack, HStack, Icon, StackDivider } from '@chakra-ui/react';
import { FaSignInAlt, FaEdit, FaQrcode } from 'react-icons/fa';

const HowToUseSection = () => {
  return (
    <Box as="section" py={16} px={8} bg="gray.50" id="how-to-use">
      <Heading as="h2" size="xl" textAlign="center" mb={12} color="#006bb2">
        How to Use
      </Heading>
      <VStack
        spacing={8}
        align="start"
        maxW="5xl"
        mx="auto"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <HStack spacing={4}>
          <Icon as={FaSignInAlt} w={8} h={8} color="#006bb2" />
          <Text fontSize="lg" textAlign="justify">
            <strong>Step 1:</strong> Sign up or log in to your account to get started.
          </Text>
        </HStack>
        <HStack spacing={4}>
          <Icon as={FaEdit} w={8} h={8} color="#006bb2" />
          <Text fontSize="lg" textAlign="justify">
            <strong>Step 2:</strong> Enter the long URL you want to shorten. Customize the short link if desired.
          </Text>
        </HStack>
        <HStack spacing={4}>
          <Icon as={FaQrcode} w={8} h={8} color="#006bb2" />
          <Text fontSize="lg" textAlign="justify">
            <strong>Step 3:</strong> Generate your shortened link and QR code, then share them anywhere!
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default HowToUseSection;

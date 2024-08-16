import React from 'react';
import { Box, Flex, Text, Button, VStack, Heading } from '@chakra-ui/react';

const HeroSection = () => {
  return (
    <Box
      as="section"
      bg="#006bb2"
      color="white"
      py={20}
      px={8}
      textAlign="center"
    >
      <Flex justifyContent="center" alignItems="center">
        <VStack spacing={6} maxW="2xl">
          <Heading as="h1" size="2xl" fontWeight="bold">
            Simplify Your Links with Our Powerful Shortening Tool
          </Heading>
          <Text fontSize="lg">
            Our link shortening app provides an easy way to manage your URLs,
            track performance, and customize your links to match your brand.
            Whether you’re a business, marketer, or influencer, our tool helps
            you optimize your online presence.
          </Text>
          <Button
            as="a"
            href="/signup"
            bg="white"
            color="#006bb2"
            _hover={{ bg: '#e0e0e0' }}
            size="lg"
            fontWeight="bold"
            px={8}
            py={6}
          >
            Get Started
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default HeroSection;

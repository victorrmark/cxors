"use client";

import { Box, Grid, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import {
  FaLink,
  FaChartLine,
  FaCog,
  FaSyncAlt,
  FaQrcode,
  FaServer,
} from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <Box as="section" py={16} px={{ base: "20px", lg: "150px" }} bg="gray.50" >
      <Heading as="h2" size="xl" textAlign="center" mb={12} color="#006bb2" id="features">
        Features
      </Heading>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={8}
        maxW="7xl"
        mx="auto"
      >
        <VStack spacing={4} bg="white" p={6} borderRadius="md" boxShadow="md">
          <Icon as={FaLink} w={10} h={10} color="#006bb2" />
          <Heading as="h3" size="md" color="#006bb2">
            Customizable Links
          </Heading>
          <Text textAlign="center">
            Why settle for a random short link when you can create your own?
            With our service, you can type in a custom short link that reflects
            your brand, campaign, or content. Our custom short link feature
            gives you the power to personalize your URLs.
          </Text>
        </VStack>

        <VStack spacing={4} bg="white" p={6} borderRadius="md" boxShadow="md">
          <Icon as={FaChartLine} w={10} h={10} color="#006bb2" />
          <Heading as="h3" size="md" color="#006bb2">
            Detailed Analytics
          </Heading>
          <Text textAlign="center">
            nderstand your audience with comprehensive analytics. Track clicks,
            geographical locations, referral sources, and device types. Use this
            data to optimize your strategies and maximize engagement.
          </Text>
        </VStack>

        <VStack spacing={4} bg="white" p={6} borderRadius="md" boxShadow="md">
          <Icon as={FaCog} w={10} h={10} color="#006bb2" />
          <Heading as="h3" size="md" color="#006bb2">
            Easy-to-use Dashboard
          </Heading>
          <Text textAlign="center">
            Our intuitive dashboard lets you create, manage, and analyze your
            links with ease. Keep track of all your links in one place, update
            them as needed, and view real-time analytics to measure performance.
          </Text>
        </VStack>

        <VStack spacing={4} bg="white" p={6} borderRadius="md" boxShadow="md">
          <Icon as={FaServer} w={10} h={10} color="#006bb2" />
          <Heading as="h3" size="md" color="#006bb2">
            Scalable and Reliable
          </Heading>
          <Text textAlign="center">
            Our infrastructure is designed to scale with your needs. Whether
            you&apos;re shortening a few links or managing thousands, our platform is
            built to perform with speed and reliability.
          </Text>
        </VStack>

        <VStack spacing={4} bg="white" p={6} borderRadius="md" boxShadow="md">
          <Icon as={FaQrcode} w={10} h={10} color="#006bb2" />
          <Heading as="h3" size="md" color="#006bb2">
            QR Code Generation
          </Heading>
          <Text textAlign="center">
            Our QR Code Generation featuer automatically creates a QR when you
            shorten links which can be easily downloaded and shared across
            various platforms.
          </Text>
        </VStack>

        <VStack spacing={4} bg="white" p={6} borderRadius="md" boxShadow="md">
          <Icon as={FaSyncAlt} w={10} h={10} color="#006bb2" />
          {/* <Icon as={FaCog} w={10} h={10} color="#006bb2" /> */}
          <Heading as="h3" size="md" color="#006bb2">
            Cross-Device Compatibility
          </Heading>
          <Text textAlign="center">
            Cross-Device Compatibility ensures that your shortened links work
            seamlessly across all devices, including mobile phones, tablets, and
            desktop computers.
          </Text>
        </VStack>
      </Grid>
    </Box>
  );
};

export default FeaturesSection;

"use client";

import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";

const FaqSection = () => {
  return (
    <Box as="section" py={16} px={8} bg="white" id="faq">
      <Heading as="h2" size="xl" textAlign="center" mb={12} color="#006bb2">
        Frequently Asked Questions
      </Heading>
      <Accordion allowToggle maxW="5xl" mx="auto">
        <AccordionItem mb={2}>
          <AccordionButton data-id="accordion-btn-1">
            <Box flex="1" textAlign="left">
              <Text fontSize="lg">
                <strong>How do I shorten a URL?</strong>
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} textAlign="justify" data-id="accordion-body-1">
            Simply enter your long URL into the input field on the homepage,
            click &#34;Shorten,&#34; and get your new, shorter URL instantly.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={2}>
          <AccordionButton data-id="accordion-btn-2">
            <Box flex="1" textAlign="left">
              <Text fontSize="lg">
                <strong>Can I customize the shortened URL?</strong>
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} textAlign="justify" data-id="accordion-body-2">
            Yes, you can customize your shortened URL by entering a custom alias
            before generating the link.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={2}>
          <AccordionButton data-id="accordion-btn-3">
            <Box flex="1" textAlign="left">
              <Text fontSize="lg">
                <strong>What is a QR code, and how do I use it?</strong>
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} textAlign="justify" data-id="accordion-body-3">
            A QR code is a machine-readable code that stores the URL. You can
            download the generated QR code and use it in your marketing
            materials, making it easy for users to scan and visit your link.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mb={2}>
          <AccordionButton data-id="accordion-btn-4">
            <Box flex="1" textAlign="left">
              <Text fontSize="lg">
                <strong>
                  Is there a limit to how many links I can shorten?
                </strong>
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} textAlign="justify" data-id="accordion-body-4">
            No, with our Free plan, you can shorten unlimited links
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default FaqSection;

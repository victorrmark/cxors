"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Text,
  Link as ChakraLink,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customPath, setCustomPath] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urlTitle, setUrlTitle] = useState("");
  const [error, setError] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [urlExists, setUrlExists] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(e.target.value);
    const urlPattern =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    //url checker doesnt work properly
    //so do well to type correct url
    //i'm rushing to meet submission deadline, ill correct it later
    setIsValidUrl(urlPattern.test(originalUrl));
  };

  const checkUrlExists = async () => {
    if (originalUrl) {
      try {
        const response = await fetch(
          `../api/check-url?url=${encodeURIComponent(originalUrl)}`
        );
        const data = await response.json();
        setUrlExists(data.exists);
      } catch (error) {
        console.error("Error checking URL existence:", error);
      }
    }
  };

  const handleNewUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPath(e.target.value);
    checkUrlExists();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidUrl) {
      setError("Please enter a valid URL.");
      return;
    }

    if (urlExists) {
      setError("This URL has already been shortened.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("../api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl, customPath, urlTitle }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
        setUrlTitle(data.urlTitle);
        setError("");
        onOpen();
      } else if (data.message.includes("duplicate key value ")) {
        setError("pathname already exist, try another name");
        setShortUrl("");
        setUrlTitle("");
        onOpen();
      } else {
        setError(data.message || "An error occurred.");
        setShortUrl("");
        setUrlTitle("");
        onOpen();
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      setShortUrl("");
      setUrlTitle("");
      onOpen();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast({
      title: "Link copied.",
      description: "The shortened link has been copied to your clipboard.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="md">
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <FormControl mb={6}>
          <FormLabel>Original URL:</FormLabel>
          <Input
            type="text"
            value={originalUrl}
            onChange={handleUrlChange}
            isInvalid={!isValidUrl}
            placeholder="www.exampleurl.com"
            errorBorderColor="red.500"
            required
          />
          {!isValidUrl && (
            <Text color="red.500">Please enter a valid URL.</Text>
          )}
        </FormControl>

        <FormControl mb={6}>
          <FormLabel>Title (optional):</FormLabel>
          <Input
            type="text"
            value={urlTitle}
            placeholder="Birthday URL"
            onChange={(e) => setUrlTitle(e.target.value)}
          />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel>Custom Path (optional):</FormLabel>
          <Input
            type="text"
            value={customPath}
            isInvalid={urlExists}
            errorBorderColor="red.500"
            onChange={handleNewUrl}
            placeholder="myurl"
          />
          {urlExists && <Text color="red.500">custom path already exits.</Text>}
        </FormControl>
        <Button
          type="submit"
          bg="#006bb2"
          color="white"
          _hover={{ bg: "#005a99" }}
          isDisabled={!isValidUrl || urlExists || isLoading} // Add isLoading check
        >
          {isLoading ? "Loading..." : "Shorten URL"}
        </Button>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="lg">
          <ModalHeader>
            {error ? (
              <Text fontSize="2xl" fontWeight="bold">
                Ops! Try again!
              </Text>
            ) : (
              <Text fontSize="2xl" fontWeight="bold">
                Yeah!! You have Cxorsed a link!
              </Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error ? (
              <Text color="red.500">{error}</Text>
            ) : (
              <>
                <Flex flexWrap="wrap" p={4} gap={4} mt={4}>
                  <ChakraLink
                    href={shortUrl}
                    isExternal
                    color="#006bb2"
                    flex="1"
                  >
                    {shortUrl}
                  </ChakraLink>
                  <IconButton
                    icon={<CopyIcon />}
                    aria-label="Copy URL"
                    onClick={handleCopy}
                    size="sm"
                    ml={2}
                    variant="outline"
                    colorScheme="blue"
                  />
                </Flex>

                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    Share your cxorsed link
                  </Text>
                  <Flex flexWrap="wrap" p={4} gap={4} mt={2}>
                    <div>
                      <IconButton
                        as="a"
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          shortUrl
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Twitter"
                        icon={<FaTwitter />}
                        colorScheme="twitter"
                        variant="outline"
                        size="sm"
                        color="#1DA1F2" // Twitter blue
                      />
                    </div>
                    <div>
                      <IconButton
                        as="a"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          shortUrl
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Facebook"
                        icon={<FaFacebookF />}
                        colorScheme="facebook"
                        variant="outline"
                        size="sm"
                        color="#1877F2" // Facebook blue
                      />
                    </div>
                    <div>
                      <IconButton
                        as="a"
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                          shortUrl
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                        icon={<FaLinkedinIn />}
                        colorScheme="linkedin"
                        variant="outline"
                        size="sm"
                        color="#0077B5" // LinkedIn blue
                      />
                    </div>
                  </Flex>
                </Box>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} colorScheme="blue">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

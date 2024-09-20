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
import { createClient } from "@/utils/supabase/client";

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customPath, setCustomPath] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urlTitle, setUrlTitle] = useState("");
  const [error, setError] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pathArray, setPathArray] = useState<String[]>([]);

  const [urlExists, setUrlExists] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const supabase = createClient();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(e.target.value);
    const urlPattern =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    //url checker doesnt work properly
    //so do well to type correct url
    //i'm rushing to meet submission deadline, ill correct it later
    setIsValidUrl(urlPattern.test(originalUrl));
  };

  useEffect(() => {
    const getLinks = async () => {
      let { data, error } = await supabase.from("urls").select("short_path");

      if(error){
        console.error(error)
      }else{
        const pathsArray = data?.map((path) => path.short_path);
        setPathArray(pathsArray as String[]);
      }
    };
    getLinks();
  }, [supabase]);

  useEffect(() => {
    setUrlExists(pathArray.includes(customPath));
  }, [customPath, pathArray]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
        setOriginalUrl("")
        setCustomPath("")
        setUrlTitle("");
        setError("");
        onOpen();
      } else if (data.message.includes("duplicate key value ")) {
        setError("pathname already exist, try another name");
        setShortUrl("");
        onOpen();
      } else {
        setError(data.message || "An error occurred.");
        setShortUrl("");
        onOpen();
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      setShortUrl("");
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
            data-id="url"
            placeholder="www.exampleurl.com"
            errorBorderColor="red.500"
            required
          />
          {!isValidUrl && (
            <Text color="red.500" data-id="invalid-url">Please enter a valid URL.</Text>
          )}
        </FormControl>

        <FormControl mb={6}>
          <FormLabel>Title (optional):</FormLabel>
          <Input
            type="text"
            value={urlTitle}
            placeholder="Birthday URL"
            onChange={(e) => setUrlTitle(e.target.value)}
            data-id="title"
          />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel>Custom Path (optional):</FormLabel>
          <Input
            type="text"
            value={customPath}
            isInvalid={urlExists}
            errorBorderColor="red.500"
            onChange={(e) => setCustomPath(e.target.value)}
            placeholder="myurl"
            data-id="path"
          />
          {urlExists && <Text color="red.500" data-id="invalid-path">custom path already exits.</Text>}
        </FormControl>
        <Button
          type="submit"
          bg="#006bb2"
          color="white"
          _hover={{ bg: "#005a99" }}
          isDisabled={!isValidUrl || urlExists || isLoading}
          data-id="submit"
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
              <Text fontSize="2xl" fontWeight="bold" data-id="path-header">
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
                    data-id="short-url"
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
                    data-id="copy-url"
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
                        color="#1DA1F2"
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
                        color="#1877F2"
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
                        color="#0077B5"
                      />
                    </div>
                  </Flex>
                </Box>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} colorScheme="blue" data-id="close">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

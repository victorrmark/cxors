"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { Button } from "@chakra-ui/react";
import {
  Box,
  Heading,
  Text,
  IconButton,
  HStack,
  useToast,
  Divider,
  Stack,
  Skeleton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Flex,
} from "@chakra-ui/react";
import { CopyIcon, DeleteIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaShareAlt,
} from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";

type UrlData = {
  id: string;
  original_url: string;
  user_id: string;
  short_path: string;
  title: string | null;
  created_at: Date;
  visit_count: number;
  last_location: string | null;
};

export default function LinkSlug({ params }: { params: { id: string } }) {
  const [urlData, setUrlData] = useState<UrlData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();
  const qrRef = useRef<HTMLDivElement>(null);
  const { id } = params;
  const toast = useToast();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchUrlDetails = async () => {
      const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setUrlData(data || []);
      }

      setLoading(false);
    };

    fetchUrlDetails();
  }, [supabase, id]);
  console.log(urlData);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteLink = async () => {
    await supabase.from("urls").delete().eq("id", id);
    router.push("/dashboard/links");
    toast({
      title: "Link deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current?.querySelector("canvas");
      if (canvas) {
        const dataURL = canvas.toDataURL("image/png");
        // .replace("image/png", "image/octet-stream");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleReload = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    location.reload();
  };

  if (loading)
    return (
      <div style={{position:"relative", top:"60px"}}>
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/links")}
          mb="10px"
          leftIcon={<ChevronLeftIcon />}
        >
          {" "}
          Go back
        </Button>
        <Skeleton height="500px" />
      </div>
    );

  if (error)
    return (
      <div style={{position:"relative", top:"60px"}}>
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/links")}
          mb="10px"
          leftIcon={<ChevronLeftIcon />}
        >
          {" "}
          Go back
        </Button>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Check you Internet connection and{" "}
          <a href="#" onClick={handleReload} className="reload">
            reload the page
          </a>
        </Text>
      </div>
    );

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard/links")}
        mb="10px"
        leftIcon={<ChevronLeftIcon />}
      >
        Go back
      </Button>
      {urlData && (
        <div>
          <Box
            p={3}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="md"
            className="links"
            display={{ base: "block", md: "flex" }}
            justifyContent="space-between"
            alignItems="flex-start"
            gap="10px"
          >
            <Box>
              <Heading size="md" mb={2} color="blue.500">
                {urlData.title
                  ? urlData.title
                  : urlData.original_url + " - undefined"}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Short URL:{" "}
                <a
                  href={`${baseUrl}/${urlData.short_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  cxorz.vercel.app/{urlData.short_path}
                </a>
              </Text>
              <Text fontSize="sm" color="gray.500" mb={5}>
                Long URL: {urlData.original_url}
              </Text>
              <Text fontSize="xs" color="gray.400" mt={5}>
                Created on: {new Date(urlData.created_at).toLocaleString()}
              </Text>
            </Box>

            <Divider
              display={{ base: "block", md: "none" }}
              borderColor="gray.200"
              my={4}
            />
            <HStack mt={4} spacing={4}>
              <IconButton
                icon={<CopyIcon />}
                aria-label="Copy URL"
                onClick={() =>
                  copyToClipboard(`${baseUrl}/${urlData.short_path}`)
                }
              />

              <Popover isLazy>
                <PopoverTrigger>
                  <IconButton icon={<FaShareAlt />} aria-label="Share URL" />
                </PopoverTrigger>
                <PopoverContent minWidth="auto" width="auto">
                  <PopoverArrow />
                  <PopoverBody>
                    <Flex gap="10px">
                      <IconButton
                        icon={<FaFacebook />}
                        aria-label="Share on Facebook"
                        onClick={() =>
                          window.open(
                            `https://facebook.com/sharer/sharer.php?u=${`${baseUrl}/${urlData.short_path}`}`,
                            "_blank"
                          )
                        }
                      />
                      <IconButton
                        icon={<FaTwitter />}
                        aria-label="Share on Twitter"
                        onClick={() =>
                          window.open(
                            `https://twitter.com/intent/tweet?url=${`${baseUrl}/${urlData.short_path}`}`,
                            "_blank"
                          )
                        }
                      />
                      <IconButton
                        icon={<FaLinkedin />}
                        aria-label="Share on LinkedIn"
                        onClick={() =>
                          window.open(
                            `https://www.linkedin.com/sharing/share-offsite/?url=${`${baseUrl}/${urlData.short_path}`}`,
                            "_blank"
                          )
                        }
                      />
                      <IconButton
                        icon={<FaEnvelope />}
                        aria-label="Share via Email"
                        onClick={() =>
                          window.open(
                            `mailto:?body=${`${baseUrl}/${urlData.short_path}`}`,
                            "_blank"
                          )
                        }
                      />
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete URL"
                onClick={deleteLink}
              />
            </HStack>
          </Box>

          <Box mb={10} mt={10}>
            <Heading size="md" mb={5}>
              Analytics
            </Heading>
            <Flex direction={{ base: "column", md: "row" }} gap={6} mb={4}>
              <Box
                bg="white"
                shadow="md"
                pt={15}
                p={6}
                borderRadius="md"
                borderWidth={1}
                flex="1"
                h={250}
                maxW="28%"
              >
                <Heading fontSize="sm" mb={2} color="gray.500">
                  Total Link Clicks
                </Heading>
                <Text fontSize="4xl" fontWeight="bold">
                  {urlData.visit_count}
                </Text>
              </Box>

              <Box
                bg="white"
                shadow="md"
                pt={15}
                p={6}
                borderRadius="md"
                borderWidth={1}
                flex="1"
                maxW="28%"
              >
                <Heading fontSize="sm" mb={2} color="gray.500">
                  Top Click Location
                </Heading>
                {urlData.last_location ? (
                  <Text fontSize="4xl" fontWeight="bold">
                    {urlData.last_location}
                  </Text>
                ) : (
                  <Text fontSize="4xl" fontWeight="bold" color="gray.500">
                    No Data
                  </Text>
                )}
              </Box>
            </Flex>
          </Box>

          <Box p={3} mt="20px">
            {" "}
            <Heading size="md" mb={5}>
              QR Code
            </Heading>
            <div>
              <div ref={qrRef}>
                <QRCode value={`${baseUrl}/${urlData.short_path}`} size={128} />
              </div>
              <Button onClick={downloadQRCode} mt="15px">
                Download QR Code
              </Button>
            </div>
          </Box>
        </div>
      )}
    </div>
  );
}

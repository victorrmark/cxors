"use client";

import React, { useState, useEffect } from "react";
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
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaShareAlt,
} from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";
// import { useUserContext } from "../../context/userContext";
import { useRouter } from "next/navigation";

type UrlData = {
  id: any;
  original_url: string;
  user_id: string;
  short_path: string;
  title: string | null;
  created_at: Date;
};

const Links = () => {
  const [userData, setUserData] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  // const { user } = useUserContext();
  const toast = useToast();
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("urls")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          setError(error.message);
        } else {
          setUserData(data || []);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteLink = async (id: string) => {
    const { error } = await supabase.from("urls").delete().eq("id", id);
    if (error) {
      toast({
        title: "Error deleting link",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setUserData((prevData) => prevData.filter((item) => item.id !== id));
      toast({
        title: "Link deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
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
      <Stack gap="15px">
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
      </Stack>
    );
  if (error)
    return (
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
      >
        Check you Internet connection and{" "}
        <a href="#" onClick={handleReload}>
          Reload the Page
        </a>
      </Text>
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Text fontSize="3xl" fontWeight="bold" mb={2}>
        Cxorsed Links
      </Text>
      {userData &&
        userData.map((item) => (
          <Box
            key={item.id}
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
              <Heading
                size="md"
                mb={2}
                cursor="pointer"
                onClick={() => router.push(`/dashboard/links/${item.id}`)}
                color="blue.500"
                className="url-heading"
              >
                {item.title ? item.title : item.original_url + " - undefined"}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Short URL:{" "}
                <a
                  href={`${baseUrl}/${item.short_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  cxorz.vercel.app/{item.short_path}
                </a>
              </Text>
              <Text fontSize="sm" color="gray.500" mb={5}>
                Long URL: {item.original_url}
              </Text>
              <Text fontSize="xs" color="gray.400" mt={5}>
                Created on: {new Date(item.created_at).toLocaleString()}
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
                onClick={() => copyToClipboard(`${baseUrl}/${item.short_path}`)}
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
                            `https://facebook.com/sharer/sharer.php?u=${`${baseUrl}/${item.short_path}`}`,
                            "_blank"
                          )
                        }
                      />
                      <IconButton
                        icon={<FaTwitter />}
                        aria-label="Share on Twitter"
                        onClick={() =>
                          window.open(
                            `https://twitter.com/intent/tweet?url=${`${baseUrl}/${item.short_path}`}`,
                            "_blank"
                          )
                        }
                      />
                      <IconButton
                        icon={<FaLinkedin />}
                        aria-label="Share on LinkedIn"
                        onClick={() =>
                          window.open(
                            `https://www.linkedin.com/sharing/share-offsite/?url=${`${baseUrl}/${item.short_path}`}`,
                            "_blank"
                          )
                        }
                      />
                      <IconButton
                        icon={<FaEnvelope />}
                        aria-label="Share via Email"
                        onClick={() =>
                          window.open(
                            `mailto:?body=${`${baseUrl}/${item.short_path}`}`,
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
                onClick={() => deleteLink(item.id)}
              />
            </HStack>
          </Box>
        ))}
      {userData === null ||
        (userData.length === 0 && (
          <Text
            fontSize="xl"
            textAlign="center"
            alignContent="center"
            color="gray.500"
          >
            No shortened links yet.
          </Text>
        ))}
    </div>
  );
};

export default Links;

"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

import {
  Box,
  Heading,
  Text,
  Button,
  Divider,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { createClient } from "@/utils/supabase/client";

type UrlData = {
  id: any;
  original_url: string;
  user_id: string;
  short_path: string;
  title: string | null;
  created_at: Date;
};

const QRCodePage = () => {
  const [userData, setUserData] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const qrRef = useRef<HTMLDivElement>(null);

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

  const handleReload = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    location.reload();
  };

  const downloadQRCode = async () => {
    if (qrRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qrcode.png";
      link.click();
    } catch (err) {
      console.error("Failed to download QR code:", err);
    }
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
      <Text fontSize="2xl" textAlign="center" color="gray.500">
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
        Cxorsed Codes
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
            alignItems="flex-start"
            gap="15px"
          >
            <div style={{ display:"flex", justifyContent:"center" }} ref={qrRef} >
              <QRCode value={`${baseUrl}/${item.short_path}`} size={128} />
            </div>
            <Box
              flex="1"
              display={{ base: "block", md: "flex" }}
              justifyContent="space-between"
              alignItems="flex-start"
              gap="10px"
            >
              <Box>
                <Heading size="md" mb={2} color="blue.500">
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
                mt={2}
              />
              <Button onClick={downloadQRCode} mt="7px" leftIcon={<DownloadIcon />}>
                Download QR Code
              </Button>

            </Box>
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
            No QRCodes yet.
          </Text>
        ))}
    </div>
  );
};

export default QRCodePage;

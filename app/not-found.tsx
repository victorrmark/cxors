'use client'
import Link from "next/link";
import error from "../public/404.png";
import Image from "next/image";

import { Box, Stack, Text, Heading } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px"
        }}
      >
        <Stack spacing="24px" direction={['column', 'row']} >
          <Image
            src={error}
            alt="404-image"
            width={500}
            style={{ height: "auto" }}
          />
          <Box>
            <Stack mt="6" spacing="3">
              <Heading size="xl">PAGE NOT FOUND</Heading>
              <Text>
                We promise this page existed once. <br/>Terrible coding broke it.
              </Text>

              <Link href="/dashboard">Go back to Home</Link>
            </Stack>
          </Box>
        </Stack>
      </div>
    </div>
  );
}

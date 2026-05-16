"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Check from "@/public/check.png";
import { Heading } from "@chakra-ui/react";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    });
  }, []);

  return (
    <div className="success-div">
      <Heading as="h1" size="2xl" color="#000" mb={4}>
        Success
      </Heading>
      <p>Logging you in...</p>
      <Image
        src={Check}
        alt="login success check image"
        width={170}
        height={50}
        className="success-img"
      />
    </div>
  );
}

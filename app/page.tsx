"use client"
import { Box, Flex, Text, Button, Image, Link, Spacer } from "@chakra-ui/react";
import Navbar from "../ui/Nav";
import HeroSection from "../ui/Hero";
import FeaturesSection from "../ui/features";
import HowToUseSection from "../ui/howToUse";
import FaqSection from "../ui/faq";
import Footer from "../ui/footer"
import {useEffect} from "react"
import { createClient } from "@/utils/supabase/client";



export default function Home() {
  useEffect(() => {
        const supabase = createClient();
    
        supabase.auth.getUser().then(({ data }) => {
          if (data.user) {
            window.location.href = '/dashboard';
          } 
        });
      }, []);
  return (
    <>
      <Navbar />
      <Box>
        <HeroSection />
      </Box>
      <FeaturesSection />
      <HowToUseSection />
      <FaqSection />
      <Footer />
    </>
  );
}

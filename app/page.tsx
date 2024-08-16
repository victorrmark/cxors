import { Box, Flex, Text, Button, Image, Link, Spacer } from "@chakra-ui/react";
import Navbar from "../ui/Nav";
import HeroSection from "../ui/Hero";
import FeaturesSection from "../ui/features";
import HowToUseSection from "../ui/howToUse";
import FaqSection from "../ui/faq";
import Footer from "../ui/footer"


export default function Home() {
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

'use client'

import { ReactNode } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import Sidebar from './sidebar';
import Header from './header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex h="100vh" width="100%">
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Box flex="1" ml={{ base: 0, md: '250px' }} position="relative" width="100%">
        <Header onOpenSidebar={onOpen} />
        <Box as="main" p="4" position="relative" top="60px">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}

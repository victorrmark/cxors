'use client'

import { ReactNode } from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import Sidebar from './sidebar';
import Header from './header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex h="100vh">
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Box flex="1" ml={{ base: 0, md: '250px' }}>
        <Header onOpenSidebar={onOpen} />
        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}

"use client"
import { Text } from '@chakra-ui/react'
import UrlShortener from '../../components/shorturl'

const DashBoard = () => {

  return (
    <>
    <div>

      <Text fontSize='3xl' fontWeight='bold' mb={10} data-id="heading">Cxors a new link</Text>
      <UrlShortener />
    </div>
    </>
  );
};

export default DashBoard;

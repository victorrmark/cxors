import { Text } from '@chakra-ui/react'
import UrlShortener from '../../components/shorturl'

const DashBoard = async () => {


  
  return (
    <>
    <div>

      <Text fontSize='3xl' fontWeight='bold' mb={10}>Cxors a new link</Text>
      <UrlShortener />
    </div>
    </>
  );
};

export default DashBoard;

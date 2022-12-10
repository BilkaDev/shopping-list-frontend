import { Box, Center, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MenuHeader } from './MenuHeader';
import logo from '../../../assets/logo.png';

export const MainHeader = () => {
  return (
    <header>
      <Box
        w="100vw"
        bg="var(--dark)"
        color="var(--white)"
        position="fixed"
        zIndex="100"
      >
        <Center>
          <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="1430px"
            h="110px"
            ml="20px"
            mr="20px"
          >
            <Box>
              <Link to="/">
                <Image
                  width={{ base: '125px', md: '200px' }}
                  maxHeight="102px"
                  src={logo}
                  alt="Shopping-list logo"
                />
              </Link>
            </Box>
            <MenuHeader />
          </Flex>
        </Center>
      </Box>
    </header>
  );
};

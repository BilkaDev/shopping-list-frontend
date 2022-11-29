import { ProductInterface } from 'interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/Redux/store';
import { SelectProductCategory } from '../../../common/components/FormElements/SelectProductCategory';
import { Box, List, ListIcon, ListItem, Stack, Text } from '@chakra-ui/layout';
import { CheckCircleIcon } from '@chakra-ui/icons';

interface Props {
  name: string;
  product: ProductInterface | undefined;
  setProduct: (product: ProductInterface | undefined) => void;
  onSelectHandler: (id: string, value: number, isValid: boolean) => void;
}

export const SearchProduct = ({ name, product, setProduct }: Props) => {
  const [suggestions, setSuggestions] = useState<ProductInterface[]>([]);
  const { listProducts } = useSelector((store: RootState) => store.products);

  const handleClick = useCallback(
    (event: KeyboardEvent) => {
      let index = suggestions.findIndex(item => item.id === product?.id);
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (suggestions[index]?.name.toLowerCase() === name.toLowerCase()) {
          return;
        } else {
          setProduct(suggestions[index - 1]);
        }
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (index === suggestions.length - 1) {
          setProduct(suggestions[index]);
        } else {
          setProduct(suggestions[index + 1]);
        }
      }
    },
    [name, product?.id, setProduct, suggestions]
  );

  useEffect(() => {
    if (name.length > 1) {
      const regex = new RegExp(`${name}`, 'gi');
      const suggestions = listProducts
        .filter(product => {
          setProduct(undefined);
          return product.name.match(regex);
        })
        .sort((a, b) => a.name.length - b.name.length);
      if (suggestions[0]?.name.toLowerCase() === name.toLowerCase()) {
        setProduct(suggestions[0]);
      }
      setSuggestions(suggestions);
    }
  }, [listProducts, name, setProduct]);

  useEffect(() => {
    document.body.addEventListener('keydown', handleClick);
    return () => {
      document.body.removeEventListener('keydown', handleClick);
    };
  }, [handleClick, name, product]);

  const setProductHandler = (product: ProductInterface) => {
    setProduct(product);
    document.body.removeEventListener('keydown', handleClick);
  };
  return (
    <Stack>
      {suggestions.length > 0 && name.length > 1 && (
        <Box pb={4} mb={4}>
          <List
            width="250px"
            bg="white"
            borderRadius="4px"
            border={'1px solid rgba(0,0,0,0.1)'}
            boxShadow="6px 5px 8px rgba(0,50,30,0.02)"
            color="var(--dark)"
          >
            {suggestions.map((suggest, id) => (
              <ListItem
                onClick={() => setProductHandler(suggest)}
                px={2}
                py={1}
                borderBottom="1px solid rgba(0,0,0,0.01)"
                bg={suggest.id === product?.id ? '#b9b9b9' : 'inherit'}
                key={id}
              >
                <Box display="inline-flex" alignItems="center">
                  <ListIcon
                    as={
                      suggest.id === product?.id ? CheckCircleIcon : undefined
                    }
                    color="green.500"
                    role="img"
                    display="inline"
                    aria-label="Selected"
                  />
                  <Text>{suggest.name}</Text>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      {/*<SelectProductCategory />*/}
    </Stack>
  );
};

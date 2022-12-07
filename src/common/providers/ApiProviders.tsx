import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../Redux/store';
import { ChakraProvider } from '@chakra-ui/react';
import { ApiProviderProps } from './ApiProviders.types';

export function ApiProviders({ children }: ApiProviderProps) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider>{children}</ChakraProvider>
      </Provider>
    </BrowserRouter>
  );
}

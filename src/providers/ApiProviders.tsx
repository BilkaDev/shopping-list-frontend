import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { store } from '@/common/Redux/store';

import { ApiProviderProps } from './ApiProviders.types';

const theme = {
  styles: {
    global: {
      '*': { margin: 0, padding: 0, boxSizing: 0 },
      html: { fontSize: '62.5%' },
      body: {
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '1.6rem',
        color: '#423e3a',
      },
      ':root': {
        '--dark': '#1e1e1f',
        '--light-dark': '#222224',
        '--light-grey': '#dadada',
        '--grey': '#292a2b',
        '--white': '#f7f7f7',
        '--chakra-fontSizes-md': '1.2rem',
      },
      'div#root': {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--light-dark)',
        color: 'var(--white)',
      },
      'header,footer': {
        flex: '0',
      },
      main: {
        marginTop: '13rem',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },
};

const customTheme = extendTheme(theme);

export function ApiProviders({ children }: ApiProviderProps) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
      </Provider>
    </BrowserRouter>
  );
}

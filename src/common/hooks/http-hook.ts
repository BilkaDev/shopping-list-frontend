import { useCallback, useState } from 'react';
import {
  CreateItemInListRequest,
  CreateListRequest,
  CreateProductRequest,
  UpdateProductRequest,
  LoginRequest,
  UpdateItemInListRequest,
  AddRecipeRequest,
  EditRecipeRequest,
  EditDescriptionRecipeRequest,
  RecoverPasswordRequest,
} from 'interfaces';
import { apiUrl } from '../../config/api';

type headerType = {
  [key: string]: string;
};

export type ReqBody =
  | LoginRequest
  | FormData
  | CreateProductRequest
  | UpdateProductRequest
  | CreateListRequest
  | CreateItemInListRequest
  | UpdateItemInListRequest
  | AddRecipeRequest
  | EditRecipeRequest
  | EditDescriptionRecipeRequest
  | RecoverPasswordRequest
  | null;

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();

  let statusError = 500;
  const sendRequest = useCallback(
    async (
      url: string,
      method = 'GET',
      body: ReqBody = null,
      headers: headerType = { 'Content-Type': 'application/json' }
    ) => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}${url}`, {
          method,
          headers: headers,
          body:
            body &&
            { body: body instanceof FormData ? body : JSON.stringify(body) }
              .body,
          credentials: 'include',
        });

        const responseData = await response.json();
        setIsLoading(false);
        if (!responseData.isSuccess) {
          setError(responseData.message);
          return responseData;
        }
        return responseData;
      } catch (e: any) {
        setError(
          statusError === 500 ? 'Sorry, please try again later' : e.message
        );
        setIsLoading(false);
        throw e;
      }
    },
    [statusError]
  );
  const clearError = () => {
    setError(null);
  };
  return { isLoading, error, sendRequest, setError, clearError };
};

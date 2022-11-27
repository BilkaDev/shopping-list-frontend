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
import {
  defaultHttpErrorMap,
  HttpError,
  HttpErrorMap,
} from '../utils/http-error';

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

export const useHttpClient = (httpErrorMap?: HttpErrorMap) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const sendRequest = useCallback(
    async (
      url: string,
      method = 'GET',
      body: ReqBody = null,
      headers: headerType = { 'Content-Type': 'application/json' }
    ) => {
      clearError();
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
        if (responseData.status !== 200 && responseData.status !== 201) {
          throw new HttpError(responseData.status);
        }
        return responseData;
      } catch (e: unknown) {
        if (httpErrorMap?.all) {
          setError(httpErrorMap.all);
          return;
        }
        if (e instanceof HttpError) {
          const message =
            httpErrorMap?.[e.statusCode] ?? defaultHttpErrorMap[e.statusCode];
          setError(message);
          return;
        }
        setError(defaultHttpErrorMap['500']);
      } finally {
        setIsLoading(false);
      }
    },
    [clearError, httpErrorMap]
  );
  return { isLoading, error, sendRequest, setError, clearError };
};

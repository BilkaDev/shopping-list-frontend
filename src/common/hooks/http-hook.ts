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
  ApiResponse,
  ChangePasswordRequest,
} from '../../types';
import { apiUrl } from '../../config/api';
import {
  defaultHttpErrorMap,
  HttpError,
  HttpErrorMap,
  KnownHttpErrorStatus,
} from '../utils/http-error';

type HeaderType = {
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
  | ChangePasswordRequest
  | null;

export type SendRequestType = <Type>(
  url: string,
  method?: string,
  body?: ReqBody,
  headers?: HeaderType
) => Promise<Type | undefined>;

export const useHttpClient = (httpErrorMap?: HttpErrorMap) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<null | string>();
  const clearError = useCallback(() => {
    setError(null);
    setIsSuccess(false);
  }, []);

  const sendRequest: SendRequestType = useCallback(
    async <Type>(
      url: string,
      method = 'GET',
      body: ReqBody = null,
      headers: HeaderType = { 'Content-Type': 'application/json' }
    ): Promise<Type | undefined> => {
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

        const responseData: ApiResponse<Type> = await response.json();
        if (responseData.status !== 200 && responseData.status !== 201) {
          throw new HttpError(
            (responseData.status + '') as KnownHttpErrorStatus
          );
        }
        setIsSuccess(true);
        return responseData.data;
      } catch (e: unknown) {
        if (httpErrorMap?.all) {
          setError(httpErrorMap.all);
          return;
        }
        if (e instanceof HttpError) {
          const message =
            httpErrorMap?.[e.statusCode] ?? defaultHttpErrorMap[e.statusCode];
          setError(message ?? defaultHttpErrorMap['500']);
          return;
        }
        setError(defaultHttpErrorMap['500']);
        return;
      } finally {
        setIsLoading(false);
      }
    },
    [clearError, httpErrorMap]
  );
  return {
    isLoading,
    isSuccess,
    sendRequest,
    setIsSuccess,
    error,
    setError,
    clearError,
  };
};

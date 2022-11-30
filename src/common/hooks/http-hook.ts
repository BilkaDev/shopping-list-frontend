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
} from 'interfaces';
import { apiUrl } from '../../config/api';
import {
  defaultHttpErrorMap,
  HttpError,
  HttpErrorMap,
  KnownHttpErrorStatus,
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
  | ChangePasswordRequest
  | null;

export const useHttpClient = (httpErrorMap?: HttpErrorMap) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>();
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const sendRequest = useCallback(
    async <Type>(
      url: string,
      method = 'GET',
      body: ReqBody = null,
      headers: headerType = { 'Content-Type': 'application/json' }
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
  return { isLoading, error, sendRequest, setError, clearError };
};

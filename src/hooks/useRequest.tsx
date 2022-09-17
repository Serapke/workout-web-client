import { useCallback, useState } from "react";
import useIsMounted from "./useIsMounted";
import { isObjectNotEmpty } from "../utils/object-utilities";
import { ApiResponse } from "../services/types";

export const enum RequestState {
  FETCHING,
  ERROR,
  SUCCESS
}

interface Request<T> {
  requestState: RequestState;
  beginRequest: () => Promise<T>;
}

export default function useRequest<T>(requestFunction: () => Promise<ApiResponse<T>>): Request<T> {
  const isMounted = useIsMounted();
  const [requestState, setRequestState] = useState<RequestState>(RequestState.FETCHING);

  const beginRequest = useCallback(() => {
    if (isMounted()) {
      setRequestState(RequestState.FETCHING);
    }

    return new Promise<T>((resolve, reject) => {
      requestFunction()
        .then((response: ApiResponse<T>) => {
          if (isObjectNotEmpty(response.data)) {
            if (isMounted()) {
              setRequestState(RequestState.SUCCESS);
            }
            resolve(response.data);
          } else {
            if (isMounted()) {
              setRequestState(RequestState.ERROR);
            }
            reject(response.errors);
          }
        })
        .catch((reason) => {
          if (isMounted()) {
            setRequestState(RequestState.ERROR);
          }
          reject(reason);
        });
    });
  }, [isMounted, requestFunction]);

  return {
    requestState,
    beginRequest
  };
}
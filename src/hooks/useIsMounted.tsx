import { useCallback, useEffect, useRef } from "react";

export default function useIsMounted() {
  const isMountedReference = useRef<boolean>(true);
  const isMounted = useCallback(() => isMountedReference.current, []);

  useEffect(() => {
    isMountedReference.current = true;
    return () => {
      isMountedReference.current = false;
    };
  });

  return isMounted;
}
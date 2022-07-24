import type { Transition } from 'history';

import { useBlocker } from "./useBlocker";
import { useCallback } from "react";

export function usePrompt(callback: (tx: Transition) => boolean, when = true) {
  const blocker = useCallback((tx: Transition) => {
    let response = callback(tx);

    if (response) {
      tx.retry();
    }
  }, [callback]);
  return useBlocker(blocker, when);
}
import type {History} from 'history';
import { ContextType, useContext, useEffect } from "react";
import { Navigator as BaseNavigator, UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

interface Navigator extends BaseNavigator {
  block: History['block'];
}

type NavigationContextWithBlock = ContextType<typeof NavigationContext> & { navigator: Navigator };

// https://stackoverflow.com/a/70121934
export function useBlocker( blocker, when = true ) {
  const { navigator } = useContext( NavigationContext ) as NavigationContextWithBlock;

  useEffect( () => {
    if ( ! when ) return;

    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker( autoUnblockingTx );
    } );

    return unblock;
  }, [ navigator, blocker, when ] );
}
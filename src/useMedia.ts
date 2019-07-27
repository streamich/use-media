import {useState, useEffect, useLayoutEffect} from 'react';
import {queryObjectToString, noop} from './utilities';
import {Effect, MediaQueryObject} from './types';

export const mockMediaQueryList: MediaQueryList = {
  media: '',
  matches: false,
  onchange: noop,
  addListener: noop,
  removeListener: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: (_: Event) => true,
};

const createUseMedia = (effect: Effect) => (
  rawQuery: string | MediaQueryObject,
  defaultState = false,
) => {
  const [state, setState] = useState(defaultState);
  const query = queryObjectToString(rawQuery);

  effect(() => {
    let mounted = true;
    const mediaQueryList: MediaQueryList =
      typeof window === 'undefined'
        ? mockMediaQueryList
        : window.matchMedia(query);

    const onChange = () => {
      if (!mounted) {
        return;
      }

      setState(Boolean(mediaQueryList.matches));
    };

    mediaQueryList.addListener(onChange);
    setState(mediaQueryList.matches);

    return () => {
      mounted = false;
      mediaQueryList.removeListener(onChange);
    };
  }, [query]);

  return state;
};

export const useMedia = createUseMedia(useEffect);
export const useMediaLayout = createUseMedia(useLayoutEffect);

export default useMedia;

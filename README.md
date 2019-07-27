# use-media

`useMedia` React sensor hook that tracks state of a CSS media query.

## Usage

With `useEffect`

```jsx
import useMedia from 'use-media';
// Alternatively, you can import as:
// import {useMedia} from 'use-media';

const Demo = () => {
  // Accepts an object of features to test
  const isWide = useMedia({minWidth: 1000});
  // Or a regular media query string
  const reduceMotion = useMedia('(prefers-reduced-motion: reduce)');

  return (
    <div>
      Screen is wide: {isWide ? '😃' : '😢'}
    </div>
  );
};
```

With `useLayoutEffect`

```jsx
import {useMediaLayout} from 'use-media';

const Demo = () => {
  // Accepts an object of features to test
  const isWide = useMediaLayout({minWidth: 1000});
  // Or a regular media query string
  const reduceMotion = useMediaLayout('(prefers-reduced-motion: reduce)');

  return (
    <div>
      Screen is wide: {isWide ? '😃' : '😢'}
    </div>
  );
};
```

## Testing

Depending on your testing setup, you may need to mock `window.matchMedia` on components that utilize the `useMedia` hook. Below is an example of doing this in `jest`:

**`/test-utilities/index.ts`**

```jsx
import {mockMediaQueryList} from 'use-media/lib/useMedia';
// Types are also exported for convienence:
// import {Effect, MediaQueryObject} from 'use-media/lib/types';

export interface MockMatchMedia {
  media: string;
  matches?: boolean;
}

function getMockImplementation({media, matches = false}: MockMatchMedia) {
  const mql: MediaQueryList = {
    ...mockMediaQueryList,
    media,
    matches,
  };

  return () => mql;
}

export function jestMockMatchMedia({media, matches = false}: MockMatchMedia) {
  const mockedImplementation = getMockImplementation({media, matches});
  window.matchMedia = jest.fn().mockImplementation(mockedImplementation);
}
```

**`/components/MyComponent/MyComponent.test.tsx`**

```jsx
const mediaQueries = {
  mobile: '(max-width: 767px)',
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
};

describe('<MyComponent />', () => {
  const defaultProps: Props = {
    duration: 100,
  };

  afterEach(() => {
    jestMockMatchMedia({
      media: mediaQueries.prefersReducedMotion,
      matches: false,
    });
  });

  it('sets `duration` to `0` when user-agent `prefers-reduced-motion`', () => {
    jestMockMatchMedia({
      media: mediaQueries.prefersReducedMotion,
      matches: true,
    });

    const wrapper = mount(<MyComponent {...defaultProps} />);
    const child = wrapper.find(TransitionComponent);

    expect(child.prop('duration')).toBe(0);
  });
});
```

## Storing in Context

Depending on your app, you may be using the `useMedia` hook to register many `matchMedia` listeners across multiple components. It may help to elevate these listeners to `Context`.

**`/components/MediaQueryProvider/MediaQueryProvider.tsx`**

```jsx
import React, {createContext, useContext, useMemo} from 'react';
import useMedia from 'use-media';

interface Props {
  children: React.ReactNode;
}

export const MediaQueryContext = createContext(null);

const mediaQueries = {
  mobile: '(max-width: 767px)',
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
};

export default function MediaQueryProvider({children}: Props) {
  const mobileView = useMedia(mediaQueries.mobile);
  const prefersReducedMotion = useMedia(mediaQueries.prefersReducedMotion);
  const value = useMemo(() => ({mobileView, prefersReducedMotion}), [
    mobileView,
    prefersReducedMotion,
  ]);

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
}

export function useMediaQueryContext() {
  return useContext(MediaQueryContext);
}
```

**`/components/App/App.tsx`**

```jsx
import React from 'react';
import MediaQueryProvider from '../MediaQueryProvider';
import MyComponent from '../MyComponent';

export default function App() {
  return (
    <MediaQueryProvider>
      <div id="MyApp">
        <MyComponent />
      </div>
    </MediaQueryProvider>
  );
}
```

**`/components/MyComponent/MyComponent.tsx`**

```jsx
import React from 'react';
import {useMediaQueryContext} from '../MediaQueryProvider';

export default function MyComponent() {
  const {mobileView, prefersReducedMotion} = useMediaQueryContext();

  return (
    <div>
      <p>mobileView: {Boolean(mobileView).toString()}</p>
      <p>prefersReducedMotion: {Boolean(prefersReducedMotion).toString()}</p>
    </div>
  );
}
```

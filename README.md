# use-media

`useMedia` React sensor hook that tracks state of a CSS media query.


## Usage

With `useEffect`

```jsx
import {useMedia} from 'use-media';

const Demo = () => {
  // Accepts an object of features to test
  const isWide = useMedia({ minWidth: 1000 });
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
  const isWide = useMediaLayout({ minWidth: 1000 });
  // Or a regular media query string
  const reduceMotion = useMediaLayout('(prefers-reduced-motion: reduce)');

  return (
    <div>
      Screen is wide: {isWide ? '😃' : '😢'}
    </div>
  );
};
```

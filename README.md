# use-media

`useMedia` React sensor hook that tracks state of a CSS media query.


## Usage

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

# use-media

`useMedia` React sensor hook that tracks state of a CSS media query.


## Usage

```jsx
import {useMedia} from 'use-media';

const Demo = () => {
  const isWide = useMedia('(min-width: 1000px)');

  return (
    <div>
      Screen is wide: {isWide ? '😃' : '😢'}
    </div>
  );
};
```

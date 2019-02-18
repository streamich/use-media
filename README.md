# use-media

`useMedia` React sensor hook that tracks state of a CSS media query.


## Usage

```jsx
import useMedia from 'use-media';

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

The default module bundle is compiled for modern browsers. If you need to support IE11 and other browsers without support for arrow functions, template literals, etc, you can use the CommonJS bundle:

```
import useMedia from 'use-media/cjs`;
```
# Equalizer

Equalizer is an es6 Class which can be used to easily make a basic fading gallery with dots and autoplay.

## Installation

with webpack

```bash
yarn add @meteora-digital/gallery
```

## HTML Usage

```html
<div [ js-my-gallery ]>
  <img src"path/to/image_001.jpg" alt="image_001" class="[ js-gallery--item ]">
  <img src"path/to/image_002.jpg" alt="image_002" class="[ js-gallery--item ]">
</div>
```

```es6
import Gallery from '@meteora-digital/gallery';

const myGallery = new Gallery(document.querySelector('.js-my-gallery'), {
  class: 'js-my-gallery',
  autoplay: true,
  duration: 5000,
  dots: true,
});
```

```scss
.js-my-gallery {
  @include meteora-gallery;
}

## License
[MIT](https://choosealicense.com/licenses/mit/)


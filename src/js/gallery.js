/*------------------------------------------------------------------
Import Modules
------------------------------------------------------------------*/

import { nodeArray, objectAssign } from '@meteora-digital/helpers';

/*------------------------------------------------------------------
Gallery
------------------------------------------------------------------*/

export default class Gallery {
  constructor(el, options = {}) {
    this.gallery = el;

    // User settings
    this.settings = objectAssign({
      class: 'js-gallery',
      autoplay: true,
      duration: 5000,
      dots: true,
    }, options);

    this.slides = nodeArray(el.querySelectorAll(`.${this.settings.class}--item`));
    this.touch = {
      x: 0,
      y: 0,
    }

    this.info = {
      index: 0,
      autoplay: this.settings.autoplay,
    };

    if (this.slides.length) {
      this.slides[0].classList.add(`${this.settings.class}--current`);
      this.slides[0].classList.add(`${this.settings.class}--active`);
    }

    if (this.slides.length >= 2) {
      this.play();

      if (this.settings.dots) {
        this.dots = document.createElement('div');
        this.dots.classList.add(`${this.settings.class}--dots`);

        this.slides.forEach((slide) => this.dots.appendChild(document.createElement('button')));
        this.buttons = nodeArray(this.dots.children);

        this.buttons.forEach((button, index) => {
          if (index === 0) button.classList.add('js-active');
          button.addEventListener('click', () => {
            if (index !== this.info.index) this.goTo(index);
            if (this.info.autoplay) this.info.autoplay = false;
          });
        });

        this.gallery.appendChild(this.dots);
      }

      this.gallery.addEventListener('touchstart', (e) => {
        this.touch.x = e.touches[0].clientX;
        this.touch.y = e.touches[0].clienty;
      });

      this.gallery.addEventListener('touchend', (e) => {
        let touch = e.touches[0] || e.changedTouches[0];
        // Swipe right
        if (this.touch.x + 50 < touch.clientX) this.goTo((this.info.index > 0) ? this.info.index - 1 : this.slides.length - 1);
        // Swipe left
        if (this.touch.x - 50 > touch.clientX) this.goTo((this.info.index < this.slides.length - 1) ? this.info.index + 1 : 0);
        
        this.touch.x = touch.clientX;
        this.touch.y = touch.clientY;
      });
    };

  }

  play() {
    if (this.info.autoplay) {
      setTimeout(() => {
        this.info.index = (this.info.index >= this.slides.length - 1) ? 0 : this.info.index + 1;

        if (this.info.autoplay) this.goTo(this.info.index);

        this.play();

      }, this.settings.duration);
    }
  }

  goTo(index) {
    if (typeof index === 'number' && index >= 0 && index <= this.slides.length) {

      this.info.index = index;

      this.buttons.forEach((button) => {
        if (button === this.buttons[this.info.index]) {
          button.classList.add('js-active');
        }else {
          button.classList.remove('js-active');
        }
      });

      this.slides.forEach((slide) => {
        if (slide === this.slides[this.info.index]) {
          slide.classList.add(`${this.settings.class}--current`);
          slide.classList.add(`${this.settings.class}--active`);
        } else {
          slide.classList.remove(`${this.settings.class}--current`);
          setTimeout(() => {
            slide.classList.remove(`${this.settings.class}--active`);
          }, 300);
        }
      });
    }
  }
}
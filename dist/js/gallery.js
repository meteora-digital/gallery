"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _meteora = require("meteora");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*------------------------------------------------------------------
Gallery
------------------------------------------------------------------*/
var Gallery = /*#__PURE__*/function () {
  function Gallery(el) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Gallery);

    this.gallery = el; // User settings

    this.settings = (0, _meteora.objectAssign)({
      "class": 'js-gallery',
      autoplay: true,
      duration: 5000,
      dots: true
    }, options);
    this.slides = (0, _meteora.nodeArray)(el.querySelectorAll(".".concat(this.settings["class"], "--item")));
    this.touch = {
      x: 0,
      y: 0
    };
    this.info = {
      index: 0,
      autoplay: this.settings.autoplay
    };

    if (this.slides.length) {
      this.slides[0].classList.add("".concat(this.settings["class"], "--current"));
      this.slides[0].classList.add("".concat(this.settings["class"], "--active"));
    }

    if (this.slides.length >= 2) {
      this.play();

      if (this.settings.dots) {
        this.dots = document.createElement('div');
        this.dots.classList.add("".concat(this.settings["class"], "--dots"));
        this.slides.forEach(function (slide) {
          return _this.dots.appendChild(document.createElement('button'));
        });
        this.buttons = (0, _meteora.nodeArray)(this.dots.children);
        this.buttons.forEach(function (button, index) {
          if (index === 0) button.classList.add('js-active');
          button.addEventListener('click', function () {
            if (index !== _this.info.index) _this.goTo(index);
            if (_this.info.autoplay) _this.info.autoplay = false;
          });
        });
        this.gallery.appendChild(this.dots);
      }

      this.gallery.addEventListener('touchstart', function (e) {
        _this.touch.x = e.touches[0].clientX;
        _this.touch.y = e.touches[0].clienty;
      });
      this.gallery.addEventListener('touchend', function (e) {
        var touch = e.touches[0] || e.changedTouches[0]; // Swipe right

        if (_this.touch.x + 50 < touch.clientX) _this.goTo(_this.info.index > 0 ? _this.info.index - 1 : _this.slides.length - 1); // Swipe left

        if (_this.touch.x - 50 > touch.clientX) _this.goTo(_this.info.index < _this.slides.length - 1 ? _this.info.index + 1 : 0);
        _this.touch.x = touch.clientX;
        _this.touch.y = touch.clientY;
      });
    }

    ;
  }

  _createClass(Gallery, [{
    key: "play",
    value: function play() {
      var _this2 = this;

      if (this.info.autoplay) {
        setTimeout(function () {
          _this2.info.index = _this2.info.index >= _this2.slides.length - 1 ? 0 : _this2.info.index + 1;
          if (_this2.info.autoplay) _this2.goTo(_this2.info.index);

          _this2.play();
        }, this.settings.duration);
      }
    }
  }, {
    key: "goTo",
    value: function goTo(index) {
      var _this3 = this;

      if (typeof index === 'number' && index >= 0 && index <= this.slides.length) {
        this.info.index = index;
        this.buttons.forEach(function (button) {
          if (button === _this3.buttons[_this3.info.index]) {
            button.classList.add('js-active');
          } else {
            button.classList.remove('js-active');
          }
        });
        this.slides.forEach(function (slide) {
          if (slide === _this3.slides[_this3.info.index]) {
            slide.classList.add("".concat(_this3.settings["class"], "--current"));
            slide.classList.add("".concat(_this3.settings["class"], "--active"));
          } else {
            slide.classList.remove("".concat(_this3.settings["class"], "--current"));
            setTimeout(function () {
              slide.classList.remove("".concat(_this3.settings["class"], "--active"));
            }, 300);
          }
        });
      }
    }
  }]);

  return Gallery;
}();

exports["default"] = Gallery;
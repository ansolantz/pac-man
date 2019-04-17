'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.log('candy');

var Candy =
/*#__PURE__*/
function () {
  function Candy(x, y, canvas) {
    _classCallCheck(this, Candy);

    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  _createClass(Candy, [{
    key: "draw",
    value: function draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
      this.ctx.fillStyle = "rgb(250, 252, 182)";
      this.ctx.fill();
      this.ctx.closePath();
    }
  }]);

  return Candy;
}();
'use strict'
console.log('level');

class Level {
  constructor(canvas, levelNumber) {
    this.canvas = canvas;
    this.levelNumber = levelNumber;
    this.color = "rgb(20, 20, 255)";

    // ---- Need to improve the drawing of the border - Loop? --- /

    this.level1 = [
      /* horizontal top*/
      { mx: 0, my: 0, dx: 476, dy: 0 },
      { mx: 476, my: 0, dx: 476, dy: 198 }, // top border right side after divider

      // First horizontal line (top of the upper boxes)
      { mx: 34, my: 34, dx: 98, dy: 34 },
      { mx: 132, my: 34, dx: 196, dy: 34 },

      // center pillar is at 230 to 246
      { mx: 280, my: 34, dx: 344, dy: 34 },
      { mx: 378, my: 34, dx: 442, dy: 34 },

      // second horizontal line (bottom of the upper boxes)
      { mx: 34, my: 98, dx: 98, dy: 98 },
      { mx: 132, my: 98, dx: 196, dy: 98 },
      { mx: 280, my: 98, dx: 344, dy: 98 },
      { mx: 378, my: 98, dx: 442, dy: 98 },

      // third horizontal line (top of second line of boxes)
      { mx: 34, my: 132, dx: 98, dy: 132 },
      { mx: 132, my: 132, dx: 148, dy: 132 },
      { mx: 182, my: 132, dx: 294, dy: 132 },
      { mx: 328, my: 132, dx: 344, dy: 132 },
      { mx: 378, my: 132, dx: 442, dy: 132 },

      // fourth horizontal line (bottom of second line of boxes)
      { mx: 34, my: 164, dx: 98, dy: 164 },
      { mx: 182, my: 148, dx: 214, dy: 148 },
      { mx: 262, my: 148, dx: 294, dy: 148 },
      { mx: 378, my: 164, dx: 442, dy: 164 },

      //small horizontal lines in the middle
      { mx: 148, my: 182, dx: 180, dy: 182 },
      { mx: 148, my: 198, dx: 180, dy: 198 },
      { mx: 214, my: 182, dx: 262, dy: 182 },
      // { mx: 262, my: 148, dx: 292, dy: 148}, 
      // { mx: 378, my: 164, dx: 442, dy: 164}, 

      // before left teleport
      { mx: 0, my: 198, dx: 98, dy: 198 },
      // before under teleport
      { mx: 0, my: 232, dx: 476, dy: 232 },

      // right teleport
      { mx: 476, my: 198, dx: 378, dy: 198 },

      /* Vertical */
      { mx: 0, my: 0, dx: 0, dy: 198 }, // top border right side after divider


      // First vertical lines
      { mx: 34, my: 34, dx: 34, dy: 98 },
      { mx: 34, my: 132, dx: 34, dy: 164 },

      // Second vertical  lines
      { mx: 98, my: 34, dx: 98, dy: 98 },
      { mx: 98, my: 132, dx: 98, dy: 164 },

      // Third vertical  lines
      { mx: 132, my: 34, dx: 132, dy: 98 },
      { mx: 132, my: 132, dx: 132, dy: 232 }, //thin line left
      { mx: 148, my: 132, dx: 148, dy: 180 }, //thin line right
      { mx: 182, my: 132, dx: 182, dy: 148 }, //small line on T
      { mx: 294, my: 132, dx: 294, dy: 148 }, //small line on T
      { mx: 214, my: 148, dx: 214, dy: 182 }, //large line on T
      { mx: 262, my: 148, dx: 262, dy: 182 }, //large line on T
      { mx: 180, my: 182, dx: 180, dy: 198 }, //small curve on laying t
      { mx: 148, my: 198, dx: 148, dy: 232 }, //

      // Fourth vertical  lines (upper boxes)
      { mx: 196, my: 34, dx: 196, dy: 98 },
      { mx: 280, my: 34, dx: 280, dy: 98 },  //Third box
      { mx: 344, my: 34, dx: 344, dy: 98 },  //third box
      { mx: 378, my: 34, dx: 378, dy: 98 },  //third box
      { mx: 442, my: 34, dx: 442, dy: 98 },  //third box
      { mx: 378, my: 132, dx: 378, dy: 164 },  //small box on right
      { mx: 442, my: 132, dx: 442, dy: 164 },  //small box on right

      // long vertical
      { mx: 328, my: 132, dx: 328, dy: 232 },  //small box on right
      { mx: 344, my: 132, dx: 344, dy: 232 },  //small box on right

      // Upper divider
      { mx: 230, my: 0, dx: 230, dy: 98 },
      { mx: 246, my: 0, dx: 246, dy: 98 },
      { mx: 230, my: 98, dx: 246, dy: 98 },
    ]
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = this.color;

  }

  draw() {
    if (this.levelNumber === 1) {

      this.level1.forEach(element => {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1; //element.w;
        this.ctx.moveTo(element.mx, element.my);
        this.ctx.lineTo(element.dx, element.dy);
        this.ctx.stroke();
      });
    }
  }
}


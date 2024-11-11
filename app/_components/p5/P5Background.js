'use client';
import { useEffect } from "react";
import p5 from "p5";

const P5Background = () => {
  useEffect(() => {
    const sketch = (p) => {
      let container;
      var inc = 0.5;
      var scale = 10;
      var cols, rows;
      var zoff = 0;

      p.setup = () => {
        container = document.getElementById("content_container");
        p.createCanvas(container.offsetWidth, container.offsetHeight);
        container.appendChild(p.canvas);
        p.canvas.style.position = "absolute";
        p.canvas.style.top = "-2px";
        p.canvas.style.left = "-2px";
        p.canvas.style.zIndex = "-1";

        cols = p.width / scale;
        rows = p.height / scale;

        p.loop();
      };

      p.draw = () => {

        p.background(150);
        let width = container.offsetWidth;
        let height = container.offsetHeight;

        var yoff = 0;
        for (let y = 0; y < rows; y++) {
          let xoff = 0;
          for (let x = 0; x < cols; x++) {
            var index = (x + y * width) * 4;
            var angle = p.noise(xoff, yoff, zoff) * p.TWO_PI;
            var v = p5.Vector.fromAngle(angle);
            xoff += inc;
            p.stroke(0);
            p.push();
            p.translate(x * scale, y * scale);
            p.rotate(v.heading());
            p.line(0, 0, scale, 0);
            p.pop();
          }
          yoff += 0.1;
          zoff += 0.0003;
        }
      };

      p.windowResized = () => {
        container = document.getElementById("content_container");
        if (container) {
          p.resizeCanvas(container.offsetWidth, container.offsetHeight);
          p.background(150);

        }
      };
    };

    const myP5 = new p5(sketch);
    return () => myP5.remove();
  }, []);

  return null;
};

export default P5Background;

// 'use client';
// import { useEffect } from "react";
// import p5 from "p5";

// const P5Background = () => {
//   useEffect(() => {
//     const sketch = (p) => {
//       function Particle() {
//         this.pos = p.createVector(p.random(p.width), p.random(p.height));
//         this.vel = p5.Vector.random2D();
//         this.acc = p.createVector(0, 0);
//         this.maxspeed = 1.5;

//         this.prevPos = this.pos.copy();

//         this.update = function () {
//           this.vel.add(this.acc);
//           this.vel.limit(this.maxspeed);
//           this.pos.add(this.vel);
//           this.acc.mult(0);
//         }

//         this.applyForce = function (force) {
//           this.acc.add(force);
//         }

//         this.show = function () {
//           p.stroke(0, 5);
//           p.strokeWeight(1);
//           p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
//           this.updatePrev();
//           // p.point(this.pos.x, this.pos.y);
//         }

//         this.updatePrev = function () {
//           this.prevPos.x = this.pos.x;
//           this.prevPos.y = this.pos.y;
//         }

//         this.edges = function () {
//           if (this.pos.x > p.width) {
//             this.pos.x = 0;
//             this.updatePrev();
//           }
//           if (this.pos.x < 0) {
//             this.pos.x = p.width;
//             this.updatePrev();

//           }
//           if (this.pos.y > p.height) {
//             this.pos.y = 0;
//             this.updatePrev();

//           }
//           if (this.pos.y < 0) {
//             this.pos.y = p.height;
//             this.updatePrev();
//           }
//         }

//         this.follow = function (vectors) {
//           var x = p.floor(this.pos.x / scale);
//           var y = p.floor(this.pos.y / scale);
//           var index = x + y * cols;
//           var force = vectors[index];
//           this.applyForce(force);
//         }
//       }

//       let container;
//       var inc = 1;
//       var scale = 200;
//       var cols, rows;
//       var zoff = 0;
//       var particles = [];

//       var flowfield = [];

//       p.setup = () => {
//         container = document.getElementById("content_container");
//         p.createCanvas(container.offsetWidth, container.offsetHeight);
//         container.appendChild(p.canvas);
//         p.canvas.style.position = "absolute";
//         p.canvas.style.top = "-2px";
//         p.canvas.style.left = "-2px";
//         p.canvas.style.zIndex = "-1";

//         cols = p.width / scale;
//         rows = p.height / scale;


//         for (let i = 0; i < 1500; i++) {
//           particles[i] = new Particle();
//         };

//         p.loop();
//       };

//       p.draw = () => {

//         // p.background(150);
//         let width = container.offsetWidth;
//         let height = container.offsetHeight;

//         var yoff = 0;
//         for (let y = 0; y < rows; y++) {
//           let xoff = 0;
//           for (let x = 0; x < cols; x++) {
//             var index = (x + y * cols);
//             var angle = p.noise(xoff, yoff, zoff) * p.TWO_PI;
//             var v = p5.Vector.fromAngle(angle);
//             v.setMag(0.025);
//             flowfield[index] = v;
//             xoff += inc;
//             // p.stroke(0, 50);
//             // p.push();
//             // p.translate(x * scale, y * scale);
//             // p.rotate(v.heading());
//             // p.strokeWeight(1);
//             // p.line(0, 0, scale, 0);
//             // p.pop();
//           }
//           yoff += 0.5;
//           zoff += 0.00001;
//         }

//         for (let i = 0; i < particles.length; i++) {
//           particles[i].follow(flowfield);
//           particles[i].update();
//           particles[i].edges();
//           particles[i].show();
//         }
//       };

//       p.windowResized = () => {
//         container = document.getElementById("content_container");
//         if (container) {
//           p.resizeCanvas(container.offsetWidth, container.offsetHeight);
//           // p.background(150);

//         }
//       };
//     };

//     const myP5 = new p5(sketch);
//     return () => myP5.remove();
//   }, []);

//   return null;
// };

// export default P5Background;


'use client';
import { useEffect, useState } from "react";
import p5 from "p5";

const P5Background = () => {
  useEffect(() => {
    let colorToggle = false;

    const sketch = (p) => {
      function Particle() {
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        this.vel = p5.Vector.random2D();
        this.acc = p.createVector(0, 0);
        this.maxspeed = 1.5;

        this.prevPos = this.pos.copy();

        this.update = function () {
          this.vel.add(this.acc);
          this.vel.limit(this.maxspeed);
          this.pos.add(this.vel);
          this.acc.mult(0);
        }

        this.applyForce = function (force) {
          this.acc.add(force);
        }

        this.show = function () {
          p.stroke(colorToggle ? 255 : 0, 5); // Wechsel zwischen Schwarz & Weiß
          p.strokeWeight(1);
          p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
          this.updatePrev();
        }

        this.updatePrev = function () {
          this.prevPos.x = this.pos.x;
          this.prevPos.y = this.pos.y;
        }

        this.edges = function () {
          if (this.pos.x > p.width) {
            this.pos.x = 0;
            this.updatePrev();
          }
          if (this.pos.x < 0) {
            this.pos.x = p.width;
            this.updatePrev();
          }
          if (this.pos.y > p.height) {
            this.pos.y = 0;
            this.updatePrev();
          }
          if (this.pos.y < 0) {
            this.pos.y = p.height;
            this.updatePrev();
          }
        }

        this.follow = function (vectors) {
          var x = p.floor(this.pos.x / scale);
          var y = p.floor(this.pos.y / scale);
          var index = x + y * cols;
          var force = vectors[index];
          this.applyForce(force);
        }
      }

      let container;
      var inc = 1;
      var scale = 200;
      var cols, rows;
      var zoff = 0;
      var particles = [];
      var flowfield = [];

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

        for (let i = 0; i < 1500; i++) {
          particles[i] = new Particle();
        }

        p.loop();

        // Wechsel alle 10 Minuten
        setInterval(() => {
          colorToggle = !colorToggle;
        }, 600000);
      };

      p.draw = () => {
        var yoff = 0;
        for (let y = 0; y < rows; y++) {
          let xoff = 0;
          for (let x = 0; x < cols; x++) {
            var index = x + y * cols;
            var angle = p.noise(xoff, yoff, zoff) * p.TWO_PI;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(0.025);
            flowfield[index] = v;
            xoff += inc;
          }
          yoff += 0.5;
          zoff += 0.00001;
        }

        for (let i = 0; i < particles.length; i++) {
          particles[i].follow(flowfield);
          particles[i].update();
          particles[i].edges();
          particles[i].show();
        }
      };

      p.windowResized = () => {
        container = document.getElementById("content_container");
        if (container) {
          p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        }
      };
    };

    const myP5 = new p5(sketch);
    return () => myP5.remove();
  }, []);

  return null;
};

export default P5Background;




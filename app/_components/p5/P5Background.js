'use client';
import { useEffect } from "react";
import p5 from "p5";

const P5Background = () => {
  useEffect(() => {
    const sketch = (p) => {
      function Particle() {
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        this.vel = p5.Vector.random2D();
        this.acc = p.createVector(0, 0);
        this.maxspeed = 2;

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
          p.stroke(0, 5);
          p.strokeWeight(1);
          p.point(this.pos.x, this.pos.y);
        }

        this.edges = function () {
          if (this.pos.x > p.width) {
            this.pos.x = 0;
          }
          if (this.pos.x < 0) {
            this.pos.x = p.width;
          }
          if (this.pos.y > p.height) {
            this.pos.y = 0;
          }
          if (this.pos.y < 0) {
            this.pos.y = p.height;
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
      var inc = 0.5;
      var scale = 10;
      var cols, rows;
      var zoff = 0;
      var particles = [];

      var flowfield;

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

        flowfield = new Array(cols * rows);

        for (let i = 0; i < 1000; i++) {
          particles[i] = new Particle();
        };

        p.loop();
      };

      p.draw = () => {

        // p.background(150);
        let width = container.offsetWidth;
        let height = container.offsetHeight;

        var yoff = 0;
        for (let y = 0; y < rows; y++) {
          let xoff = 0;
          for (let x = 0; x < cols; x++) {
            var index = (x + y * cols);
            var angle = p.noise(xoff, yoff, zoff) * p.TWO_PI;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(0.5);
            flowfield[index] = v;
            xoff += inc;
            // p.stroke(0, 50);
            // p.push();
            // p.translate(x * scale, y * scale);
            // p.rotate(v.heading());
            // p.line(0, 0, scale, 0);
            // p.pop();
          }
          yoff += 0.1;
          zoff += 0.0001;
        }

        for (let i = 0; i < particles.length; i++) {
          particles[i].follow(flowfield);
          particles[i].update();
          particles[i].show();
          particles[i].edges();
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



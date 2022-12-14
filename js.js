/*
  Johan Karlsson, 2022
  https://twitter.com/DonKarlssonSan
  MIT License, see Details View
*/

class Mover {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      const m = Math.min(w, h);
      this.size = (Math.random() + 0.08) * m * 0.1;
      this.r = (Math.random() + 0.1) * m * 0.4;
      const dir1 = Math.random() > 0.5 ? -1 : 1;
      this.ownAxisRotSpeed = dir1 * Math.random() * 0.03 +0.007;
      const dir2 = Math.random() > 0.5 ? -1 : 1;
      this.rotSpeed = dir2 * Math.random() * 0.008 +0.0005;
      this.ownAxisAngle = 0;
      this.angle = Math.random() * Math.PI * 2;
      const s = Math.floor(Math.random() * 40 + 20);
      const l = Math.floor(Math.random() * 80 + 10);
      const comp = Math.random() > 0.9 ? 0 : 180;
      const extra = Math.floor(Math.random() * 5);
      this.color = `hsla(${baseHue + comp + extra}, ${s}%, ${l}%, 0.03)`;
    }
  
    move() {
      this.ownAxisAngle += this.ownAxisRotSpeed;
      this.angle += this.rotSpeed;
    }
    
    draw() {
      const x = this.x + Math.cos(this.angle) * this.r;
      const y = this.y + Math.sin(this.angle) * this.r;
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.translate(x, y);
      ctx.rotate(this.ownAxisAngle);
      ctx.fillRect(-this.size / 16, -this.size/2, this.size/8, this.size);
      ctx.restore();
    }
  }
  
  let canvas;
  let ctx;
  let w, h;
  let movers;
  let baseHue;
  
  function setup() {
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", () => {
      resize();
    });
    canvas.addEventListener("click", reset);
    reset();
  }
  
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  
  function reset() {
    baseHue = Math.floor(Math.random() * 360);
    movers = [];
    const nrOfSquares = w * h * 0.0004;
    for(let i = 0; i < nrOfSquares; i++) {
      const m = new Mover();
      movers.push(m);
    }
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
  }
  
  function draw() {
    requestAnimationFrame(draw);
    movers.forEach(m => {
      m.move();
      m.draw();
    });
  }
  
  setup();
  draw();
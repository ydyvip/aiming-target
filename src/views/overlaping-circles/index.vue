<template>
  <div>
    <canvas
      id="canvasOverlaping"
      style="border:1px solid #e1e1e1;"
      @contextmenu.prevent
    ></canvas>
  </div>
</template>
<script>
import { getRadians } from "@/utils";
import { Circle } from "@/utils/overlaping-circles";

export default {
  data() {
    return {};
  },

  mounted() {
    const canvas = document.getElementById("canvasOverlaping");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#000";
    const a = new Circle("a", 150, 100, 40),
      b = new Circle("b", 100, 150, 50),
      c = new Circle("c", 210, 210, 80),
      d = new Circle("d", 260, 90, 100),
      e = new Circle("e", 260, 100, 90),
      f = new Circle("f", 150, 100, 40);

    this.paintingOutline([a, b, c, d, e, f]);
  },
  methods: {
    paintingOutline(circles) {
      let total = 0;
      for (let circle of circles) {
        const others = circles.filter(other => other !== circle);
        // 绘制圆形
        // this.drawCircle(circle.x, circle.y, circle.r);
        // 统计
        total += circle.outline(others, this.drawCircle);
      }

      return total;
    },
    drawCircle(x, y, r, startAngle = 0, endAngle = 360, clockWise = false) {
      const canvas = document.getElementById("canvasOverlaping");
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "black";
      ctx.arc(x, y, r, getRadians(startAngle), getRadians(endAngle), clockWise);
      ctx.stroke();
    }
  }
};
</script>

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
function intersectLine(a, b) {
  const [s0, e0, s1, e1] = [a.start, a.end, b.start, b.end],
    s = Math.max(s0, s1),
    e = Math.min(e0, e1);
  if (e <= s) return { start: 0, end: 0 };
  return { start: s, end: e };
}

class SectorSet {
  constructor(sectors) {
    this.sets = sectors;
  }

  get() {
    return this.sets;
  }

  add(other) {
    let acc = [];
    for (let mine of this.sets) {
      for (let others of other.get()) {
        acc.push(intersectLine(mine, others));
      }
    }
    this.sets = acc.filter(sector => sector.start !== sector.end);
    return this;
  }
}

class Circle {
  CONTAINS = 0;
  CONTAINED = 1;
  DISJOINT = 2;
  INTERSECT = 3;

  constructor(name, x, y, r) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.r = r;
  }

  intersect(other) {
    const [a, b, c, d, r0, r1] = [
      this.x,
      this.y,
      other.x,
      other.y,
      this.r,
      other.r
    ];
    const r0sq = Math.pow(r0, 2),
      r1sq = Math.pow(r1, 2),
      Dsq = Math.pow(c - a, 2) + Math.pow(d - b, 2),
      D = Math.pow(Dsq, 0.5);
    if (D >= r0 + r1) return { type: this.DISJOINT, i1: null, i2: null };
    if (D <= Math.abs(r0 - r1))
      return { type: this.CONTAINED, i1: null, i2: null };
    if (r0 < r1) {
    } else return { type: this.CONTAINS, i1: null, i2: null };

    const dd =
        0.25 *
        Math.pow(
          (D + r0 + r1) * (D + r0 - r1) * (D - r0 + r1) * (-D + r0 + r1),
          0.5
        ),
      x = (a + c) / 2.0 + ((c - a) * (r0sq - r1sq)) / 2.0 / Dsq,
      x1 = x + ((2 * (b - d)) / Dsq) * dd,
      x2 = x - ((2 * (b - d)) / Dsq) * dd,
      y = (b + d) / 2.0 + ((d - b) * (r0sq - r1sq)) / 2.0 / Dsq,
      y1 = y - ((2 * (a - c)) / Dsq) * dd,
      y2 = y + ((2 * (a - c)) / Dsq) * dd;
    return {
      type: this.INTERSECT,
      i1: [x1, y1],
      i2: [x2, y2]
    };
  }

  angle(point) {
    const [x0, y0, x, y] = [this.x, this.y, point[0], point[1]];
    let a = Math.atan2(y - y0, x - x0) + 1.5 * Math.PI;
    if (a >= 2 * Math.PI) {
      a -= 2 * Math.PI;
    }
    return (a / Math.PI) * 180;
  }

  sector(other) {
    const { type, i1, i2 } = this.intersect(other);
    if (type === this.DISJOINT) return new SectorSet([{ start: 0, end: 360 }]);
    if (type === this.CONTAINS) return new SectorSet([{ start: 0, end: 360 }]);
    if (type === this.CONTAINED) return new SectorSet([]);
    const a1 = this.angle(i1);
    const a2 = this.angle(i2);

    if (a1 > a2)
      return new SectorSet([
        { start: 0, end: a2 },
        { start: a1, end: 360 }
      ]);
    return new SectorSet([{ start: a1, end: a2 }]);
  }

  outline(others) {
    let sectors = new SectorSet([{ start: 0, end: 360 }]);
    console.log(`${this.name}: `, this.r, sectors);
    for (let other of others) {
      sectors.add(this.sector(other));
    }
    let u = 2 * this.r * Math.PI,
      total = 0;
    for (let { start, end } of sectors.get()) {
      total += ((end - start) / 360) * u;
    }

    return total;
  }
}

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
    // const a = new Circle("a", 150, 100, 40),
    //   b = new Circle("b", 100, 150, 50),
    //   c = new Circle("c", 210, 210, 80),
    //   d = new Circle("d", 260, 100, 90);
    const a = new Circle("a", 100, 100, 2),
      b = new Circle("b", 98, 99, 1),
      c = new Circle("c", 102, 99, 1),
      d = new Circle("d", 100, 102, 1);

    console.log(this.paintingOutline([a, b, c, d]));
  },
  methods: {
    paintingOutline(circles) {
      let total = 0;
      for (let circle of circles) {
        const others = circles.filter(other => other !== circle);
        // 绘制圆形
        this.drawCircle(circle);
        // 统计
        total += circle.outline(others);
      }

      return total;
    },
    drawCircle({ x, y, r }) {
      const canvas = document.getElementById("canvasOverlaping");
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "black";
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
};
</script>

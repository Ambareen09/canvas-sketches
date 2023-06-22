const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [500, 500],
  // animate: true
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5; //change to 0.05 for a quarter
    const cy = height * 0.5; //change to 0.95 for a quarter

    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 50;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(1, 2), random.range(0.7, 0.9));

      const strokeColor = random.pick([
        '#E7CBA9', // Sand
        '#B5BFA1', // Sage
        '#9E9D89', // Olive
        '#C9B6A6', // Taupe
        '#BEBAA7', // Beige
        '#D7C9AA', // Ivory
      ]);
      context.fillStyle = strokeColor;
      context.beginPath();
      context.rect(-w * -0.12, random.range(0, -h * 0.8), -w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      const arcColor = random.pick([
        '#F5DEB3', // Wheat
        '#D2B48C', // Tan
        '#FFE4C4', // Bisque
        '#FAEBD7', // AntiqueWhite
        '#FFEBCD', // BlanchedAlmond
        '#FFDAB9', // PeachPuff
      ]);
      context.strokeStyle = arcColor;
      context.lineWidth = random.range(5, 7);

      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.9, 1.5),
        slice * random.range(1, -8),
        slice * random.range(1, 5)
      );
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);

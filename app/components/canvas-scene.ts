export function drawScene(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  context.clearRect(0, 0, width, height);

  const sky = context.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#1B3A2D");
  sky.addColorStop(0.5, "#2D5040");
  sky.addColorStop(1, "#3D5A47");
  context.fillStyle = sky;
  context.fillRect(0, 0, width, height);

  drawMoon(context, width, height);
  drawStars(context, width, height);
  drawMountains(context, width, height);
  drawSnowGround(context, width, height);

  drawTree(context, width * 0.06, height * 0.82, width * 0.065, height * 0.26);
  drawTree(context, width * 0.14, height * 0.84, width * 0.05, height * 0.2);
  drawTree(context, width * 0.87, height * 0.82, width * 0.06, height * 0.24);
  drawTree(context, width * 0.94, height * 0.84, width * 0.045, height * 0.18);

  drawHouse(context, width * 0.72, height * 0.7, width * 0.12, height * 0.12);
  drawLights(context, width, height);
  drawCandyCane(context, width * 0.25, height * 0.82, height * 0.14);
  drawCandyCane(context, width * 0.75, height * 0.82, height * 0.14);
  drawSnowman(context, width * 0.38, height * 0.78, height * 0.035);
}

function drawMoon(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const x = width * 0.82;
  const y = height * 0.12;

  context.beginPath();
  context.arc(x, y, 60, 0, Math.PI * 2);
  const glow = context.createRadialGradient(x, y, 30, x, y, 60);
  glow.addColorStop(0, "rgba(245,201,122,0.15)");
  glow.addColorStop(1, "rgba(245,201,122,0)");
  context.fillStyle = glow;
  context.fill();

  context.beginPath();
  context.arc(x, y, 38, 0, Math.PI * 2);
  const moon = context.createRadialGradient(x, y, 0, x, y, 38);
  moon.addColorStop(0, "#FFF8E7");
  moon.addColorStop(1, "#F5C97A");
  context.fillStyle = moon;
  context.fill();
}

function drawStars(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const stars = [
    [0.05, 0.05],
    [0.15, 0.03],
    [0.28, 0.08],
    [0.42, 0.04],
    [0.55, 0.09],
    [0.65, 0.03],
    [0.72, 0.07],
    [0.9, 0.05],
    [0.95, 0.1],
    [0.1, 0.15],
    [0.35, 0.13],
    [0.5, 0.18],
    [0.6, 0.14],
    [0.75, 0.18],
    [0.88, 0.16],
    [0.2, 0.2],
    [0.45, 0.22],
  ];

  context.fillStyle = "rgba(255,255,255,0.8)";
  stars.forEach(([x, y], index) => {
    context.beginPath();
    context.arc(x * width, y * height, 0.7 + (index % 3) * 0.45, 0, Math.PI * 2);
    context.fill();
  });
}

function drawSnowGround(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  context.beginPath();
  context.moveTo(0, height);
  context.lineTo(0, height * 0.8);
  context.bezierCurveTo(
    width * 0.15,
    height * 0.74,
    width * 0.25,
    height * 0.78,
    width * 0.35,
    height * 0.76,
  );
  context.bezierCurveTo(
    width * 0.5,
    height * 0.73,
    width * 0.6,
    height * 0.78,
    width * 0.7,
    height * 0.75,
  );
  context.bezierCurveTo(
    width * 0.8,
    height * 0.72,
    width * 0.9,
    height * 0.77,
    width,
    height * 0.74,
  );
  context.lineTo(width, height);
  context.closePath();

  const snow = context.createLinearGradient(0, height * 0.7, 0, height);
  snow.addColorStop(0, "#F5EFE6");
  snow.addColorStop(1, "#EDE6DA");
  context.fillStyle = snow;
  context.fill();
}

function drawTree(
  context: CanvasRenderingContext2D,
  x: number,
  baseY: number,
  halfWidth: number,
  treeHeight: number,
) {
  for (let index = 0; index < 3; index += 1) {
    const layerY = baseY - treeHeight * (index / 3);
    const layerHeight = treeHeight * 0.45;
    const layerWidth = halfWidth * (1 - index * 0.25);

    context.beginPath();
    context.moveTo(x, layerY - layerHeight);
    context.lineTo(x - layerWidth, layerY);
    context.lineTo(x + layerWidth, layerY);
    context.closePath();
    context.fillStyle = "#2D5040";
    context.fill();

    context.beginPath();
    context.moveTo(x, layerY - layerHeight);
    context.lineTo(x - layerWidth * 0.5, layerY - layerHeight * 0.5);
    context.lineTo(x + layerWidth * 0.5, layerY - layerHeight * 0.5);
    context.closePath();
    context.fillStyle = "rgba(245,239,230,0.85)";
    context.fill();
  }

  context.fillStyle = "#4A3728";
  context.fillRect(
    x - halfWidth * 0.15,
    baseY - treeHeight * 0.08,
    halfWidth * 0.3,
    treeHeight * 0.08,
  );
}

function drawHouse(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  context.fillStyle = "#B85450";
  context.fillRect(x, y, width, height);

  context.beginPath();
  context.moveTo(x - width * 0.1, y);
  context.lineTo(x + width * 0.5, y - height * 0.5);
  context.lineTo(x + width * 1.1, y);
  context.closePath();
  context.fillStyle = "#2B2B2B";
  context.fill();

  context.beginPath();
  context.moveTo(x - width * 0.1, y);
  context.lineTo(x + width * 0.5, y - height * 0.5);
  context.lineTo(x + width * 0.5, y - height * 0.35);
  context.bezierCurveTo(
    x + width * 0.3,
    y - height * 0.1,
    x + width * 0.1,
    y + height * 0.05,
    x - width * 0.1,
    y,
  );
  context.closePath();
  context.fillStyle = "rgba(245,239,230,0.9)";
  context.fill();

  context.fillStyle = "#C4A882";
  context.fillRect(x + width * 0.38, y + height * 0.45, width * 0.22, height * 0.55);
  context.fillStyle = "#F5C97A";
  context.fillRect(x + width * 0.1, y + height * 0.2, width * 0.22, width * 0.22);
  context.fillStyle = "#4A3728";
  context.fillRect(x + width * 0.6, y - height * 0.55, width * 0.15, height * 0.45);

  context.beginPath();
  context.arc(x + width * 0.675, y - height * 0.62, width * 0.08, 0, Math.PI * 2);
  context.fillStyle = "rgba(237,230,218,0.5)";
  context.fill();
  context.beginPath();
  context.arc(x + width * 0.72, y - height * 0.72, width * 0.06, 0, Math.PI * 2);
  context.fill();
}

function drawLights(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const y = height * 0.04;
  const colors = ["#B85450", "#3D5A47", "#F5C97A", "#B85450", "#3D5A47"];

  context.beginPath();
  context.moveTo(0, y);

  for (let index = 0; index <= 12; index += 1) {
    const x = (width / 12) * index;
    context.lineTo(x, y + Math.sin(index * 0.8) * height * 0.015);
  }

  context.strokeStyle = "rgba(43,43,43,0.5)";
  context.lineWidth = 1;
  context.stroke();

  for (let index = 0; index <= 12; index += 1) {
    const x = (width / 12) * index;
    const bulbY = y + Math.sin(index * 0.8) * height * 0.015 + 5;
    const color = colors[index % colors.length];

    context.beginPath();
    context.arc(x, bulbY, 10, 0, Math.PI * 2);
    const glow = context.createRadialGradient(x, bulbY, 2, x, bulbY, 10);
    glow.addColorStop(0, `${color}55`);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = glow;
    context.fill();

    context.beginPath();
    context.ellipse(x, bulbY, 5, 7, 0, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
  }
}

function drawCandyCane(
  context: CanvasRenderingContext2D,
  x: number,
  baseY: number,
  height: number,
) {
  const stripeWidth = 5;

  for (let index = 0; index < 8; index += 1) {
    context.beginPath();
    context.rect(
      x - stripeWidth,
      baseY - height + (height / 8) * index,
      stripeWidth * 2,
      height / 8,
    );
    context.fillStyle = index % 2 === 0 ? "#F5EFE6" : "#B85450";
    context.fill();
  }

  context.beginPath();
  context.arc(x + stripeWidth, baseY - height, stripeWidth * 1.5, Math.PI, 0);
  context.lineWidth = stripeWidth * 2;
  context.strokeStyle = "#F5EFE6";
  context.stroke();

  context.beginPath();
  context.arc(x + stripeWidth, baseY - height, stripeWidth * 1.5, Math.PI, 0);
  context.lineWidth = stripeWidth;
  context.strokeStyle = "#B85450";
  context.setLineDash([4, 4]);
  context.stroke();
  context.setLineDash([]);
}

function drawMountains(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  context.beginPath();
  context.moveTo(0, height * 0.8);
  context.lineTo(width * 0.2, height * 0.55);
  context.lineTo(width * 0.45, height * 0.78);
  context.lineTo(width * 0.7, height * 0.55);
  context.lineTo(width * 0.9, height * 0.75);
  context.lineTo(width, height * 0.7);
  context.lineTo(width, height);
  context.lineTo(0, height);
  context.closePath();
  context.fillStyle = "#224233";
  context.fill();
}

function drawSnowman(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) {
  // Bottom circle
  context.beginPath();
  context.arc(x, y, size, 0, Math.PI * 2);
  context.fillStyle = "#F5EFE6";
  context.fill();

  // Middle circle
  context.beginPath();
  context.arc(x, y - size * 1.5, size * 0.75, 0, Math.PI * 2);
  context.fillStyle = "#F5EFE6";
  context.fill();

  // Head circle
  context.beginPath();
  context.arc(x, y - size * 2.6, size * 0.5, 0, Math.PI * 2);
  context.fillStyle = "#F5EFE6";
  context.fill();

  // Eyes
  context.fillStyle = "#2B2B2B";
  context.beginPath();
  context.arc(x - size * 0.18, y - size * 2.7, size * 0.06, 0, Math.PI * 2);
  context.arc(x + size * 0.18, y - size * 2.7, size * 0.06, 0, Math.PI * 2);
  context.fill();

  // Carrot nose
  context.fillStyle = "#D97706";
  context.beginPath();
  context.moveTo(x, y - size * 2.6);
  context.lineTo(x + size * 0.35, y - size * 2.55);
  context.lineTo(x, y - size * 2.5);
  context.closePath();
  context.fill();

  // Top hat
  context.fillStyle = "#2B2B2B";
  context.fillRect(x - size * 0.5, y - size * 3.1, size, size * 0.1);
  context.fillRect(x - size * 0.3, y - size * 3.6, size * 0.6, size * 0.5);

  // Red scarf
  context.fillStyle = "#B85450";
  context.fillRect(x - size * 0.35, y - size * 2.15, size * 0.7, size * 0.12);
  context.fillRect(x + size * 0.1, y - size * 2.15, size * 0.15, size * 0.5);
}

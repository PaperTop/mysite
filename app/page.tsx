"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PageId = "me" | "goods" | "brain" | "talk";

const pages: { id: PageId; label: string }[] = [
  { id: "me", label: "Me" },
  { id: "goods", label: "Goods" },
  { id: "brain", label: "Brain" },
  { id: "talk", label: "Talk?" },
];

const snowflakes = Array.from({ length: 22 }, (_, index) => ({
  delay: `${(index % 8) * 0.72}s`,
  duration: `${5 + (index % 6) * 0.86}s`,
  glyph: ["❄", "❅", "❆", "✦"][index % 4],
  left: `${(index * 37) % 100}%`,
  opacity: 0.32 + (index % 5) * 0.1,
  size: `${8 + (index % 7) * 1.7}px`,
}));

export default function Home() {
  const [activePage, setActivePage] = useState<PageId>("me");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hohos, setHohos] = useState<number[]>([]);

  const playHoho = useCallback(() => {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    const audio = new Audio(`/audio/hohoho${randomNum}.mp3`);
    audio.play().catch((err) => console.error("Audio playback failed:", err));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    function resize() {
      if (!canvas || !context) {
        return;
      }

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawScene(context, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <main className="min-h-screen min-h-[100svh] bg-gradient-to-br from-[#fbf7ef] to-[#e7dccb]">
      <div className="relative w-full min-h-screen min-h-[100svh] overflow-hidden border-0 rounded-none">
        <canvas
          aria-hidden="true"
          className="fixed inset-0 z-0 w-screen h-screen"
          ref={canvasRef}
        />

        {snowflakes.map((flake, index) => (
          <span
            aria-hidden="true"
            className="fixed top-[-20px] text-[rgba(255,255,255,0.7)] animate-fall pointer-events-none select-none z-[1]"
            key={index}
            style={{
              animationDelay: flake.delay,
              animationDuration: flake.duration,
              fontSize: flake.size,
              left: flake.left,
              opacity: flake.opacity,
            }}
          >
            {flake.glyph}
          </span>
        ))}

        <div className="fixed top-[18%] left-0 w-full h-[100px] z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="inline-block text-[clamp(24px,3vw,36px)] drop-shadow-[0_0_8px_rgba(255,255,255,0.45)] animate-fly-across whitespace-nowrap">🦌🦌🛷🎅✨</span>
        </div>

        <div className="relative z-[1] min-h-[inherit] bg-transparent">
          <nav className="sticky top-0 z-10 min-h-[clamp(60px,8vh,80px)] px-[clamp(22px,6vw,72px)] border-b border-tan/25 bg-cream/92 backdrop-blur-[18px] backdrop-saturate-[1.4] flex items-center justify-center animate-nav-fade-in max-[720px]:px-[18px] max-[430px]:px-[14px] max-[430px]:py-[10px]" aria-label="Primary navigation">
            <div className="flex items-center gap-[clamp(24px,3.5vw,40px)] w-full max-w-[1040px] mx-auto max-[720px]:gap-[10px] max-[430px]:flex-wrap max-[430px]:gap-[6px]">
              <span className="text-charcoal text-[clamp(17px,1.7vw,22px)] font-semibold whitespace-nowrap tracking-[-0.02em] transition-colors duration-300 hover:text-red max-[430px]:text-[15px]">Jaden 🎁</span>
              <div className="flex gap-[clamp(4px,0.8vw,6px)] ml-auto max-[720px]:gap-[2px] max-[430px]:order-3 max-[430px]:w-full max-[430px]:gap-[2px]">
                {pages.map((page) => (
                  <button
                    className={`cursor-pointer border-0 bg-transparent text-[clamp(14px,1.35vw,16px)] px-[14px] py-[6px] rounded-lg transition-colors duration-250 relative hover:text-charcoal hover:bg-tan/15 max-[720px]:text-[12px] max-[720px]:px-[10px] max-[720px]:py-[5px] max-[430px]:text-[11px] max-[430px]:px-[8px] max-[430px]:py-[4px] ${
                      activePage === page.id
                        ? "text-red bg-red/10 font-semibold"
                        : "text-charcoal font-medium"
                    }`}
                    key={page.id}
                    onClick={() => setActivePage(page.id)}
                    type="button"
                  >
                    {page.label}
                  </button>
                ))}
              </div>
              <a className="ml-[clamp(8px,1.5vw,16px)] px-[18px] py-[8px] border-none rounded-lg bg-red text-cream cursor-pointer text-[clamp(13px,1.2vw,15px)] font-medium tracking-[0.01em] transition-[transform,box-shadow,background-color] duration-200 shadow-[0_1px_3px_rgba(184,84,80,0.25)] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(184,84,80,0.35)] hover:bg-[#c45c58] max-[720px]:px-[12px] max-[720px]:py-[6px] max-[430px]:ml-auto max-[430px]:px-[10px] max-[430px]:py-[5px] max-[430px]:text-[12px]" href="#resume">
                Resume
              </a>
            </div>
          </nav>

          <section
            className={`min-h-[calc(100vh-clamp(68px,9vh,96px))] min-h-[calc(100svh-clamp(68px,9vh,96px))] p-[clamp(24px,4vw,56px)] max-[720px]:px-[18px] max-[720px]:pt-[28px] max-[720px]:pb-[40px] max-[430px]:px-[12px] max-[430px]:pt-[46px] max-[430px]:pb-[34px] ${
              activePage === "me" ? "grid items-center" : "hidden"
            }`}
            aria-hidden={activePage !== "me"}
          >
            <div className="w-[min(100%,1040px)] min-w-0 p-[clamp(24px,4vw,44px)] border-[0.5px] border-tan/40 rounded-[clamp(16px,2vw,26px)] bg-cream/85 backdrop-blur-[10px] max-[720px]:w-full max-[720px]:min-h-auto max-[430px]:p-[24px] max-[430px]:w-[calc(100vw-24px)] max-[430px]:max-w-[calc(100vw-24px)]">
              <span className="inline-block mb-[16px] px-[14px] py-[6px] rounded-[20px] bg-pine/12 text-pine text-[clamp(12px,1.3vw,16px)] font-medium">AI @ UCSD</span>
              <h1 className="mt-0 mx-0 mb-[18px] text-charcoal text-[clamp(38px,5vw,64px)] font-medium leading-[1.12] tracking-0 relative max-[720px]:text-[clamp(34px,10vw,52px)] max-[430px]:text-[clamp(34px,11vw,44px)] max-[430px]:leading-[1.16]">
                Hey, I&apos;m Jaden{" "}
                <span
                  className="bg-gradient-to-br from-[#c0392b] via-[#e74c3c] via-[#f39c12] via-[#e74c3c] to-[#c0392b] bg-[length:300%_300%] bg-clip-text text-transparent animate-santa-shimmer font-semibold cursor-pointer transition-transform duration-200 inline-block hover:scale-[1.08] active:scale-[0.95]"
                  onClick={() => { setHohos((prev) => [...prev, Date.now()]); playHoho(); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { setHohos((prev) => [...prev, Date.now()]); playHoho(); } }}
                >
                  Santa
                </span>{" "}
                Huang.
                {hohos.map((id) => (
                  <span
                    key={id}
                    className="absolute left-1/2 -translate-x-1/2 text-[clamp(18px,2.5vw,28px)] font-semibold text-red bg-none pointer-events-none whitespace-nowrap animate-hoho-float"
                    onAnimationEnd={() => setHohos((prev) => prev.filter((h) => h !== id))}
                  >
                    Ho Ho Ho! 🎅
                  </span>
                ))}
                <br />
                I learn things.
              </h1>
              <p className="max-w-[720px] mt-0 mx-0 mb-[28px] text-stone text-[clamp(16px,1.5vw,21px)] leading-[1.65] break-all max-[430px]:max-w-full max-[430px]:text-[15px]">
                I built this site not only as a portfolio, but also as a place to share my thoughts and ideas. I wanted to show what I have accomplished, but I also wanted to make something more personal. I wanted whoever comes across this site to really get to know who I am as a person, the values I hold, and what I&apos;m working on. As a result, I present knowJaden.dev.
              </p>
              <div className="flex gap-[10px] flex-wrap max-[430px]:flex-col">
                <button
                  className="inline-flex items-center justify-center min-h-[44px] px-[22px] py-[10px] rounded-lg cursor-pointer text-[clamp(14px,1.25vw,17px)] font-medium border-none bg-red text-cream max-[430px]:w-full"
                  onClick={() => setActivePage("goods")}
                  type="button"
                >
                  See my work
                </button>
                <button
                  className="inline-flex items-center justify-center min-h-[44px] px-[22px] py-[10px] rounded-lg cursor-pointer text-[clamp(14px,1.25vw,17px)] font-medium border-[1.5px] border-pine bg-transparent text-pine max-[430px]:w-full"
                  onClick={() => setActivePage("talk")}
                  type="button"
                >
                  Let&apos;s talk
                </button>
              </div>
            </div>
          </section>

          <section
            className={`min-h-[calc(100vh-clamp(68px,9vh,96px))] min-h-[calc(100svh-clamp(68px,9vh,96px))] p-[clamp(24px,4vw,56px)] max-[720px]:px-[18px] max-[720px]:pt-[28px] max-[720px]:pb-[40px] max-[430px]:px-[12px] max-[430px]:pt-[46px] max-[430px]:pb-[34px] ${
              activePage === "goods" ? "grid items-center" : "hidden"
            }`}
            aria-hidden={activePage !== "goods"}
          >
            <div className="w-[min(100%,1040px)] min-w-0 p-[clamp(24px,4vw,44px)] border-[0.5px] border-tan/40 rounded-[clamp(16px,2vw,26px)] bg-cream/85 backdrop-blur-[10px] max-[720px]:w-full max-[720px]:min-h-auto max-[430px]:p-[24px] max-[430px]:w-[calc(100vw-24px)] max-[430px]:max-w-[calc(100vw-24px)]">
              <h2 className="mt-0 mx-0 mb-[6px] text-charcoal text-[clamp(28px,4vw,48px)] font-medium">Goods 🎁</h2>
              <p className="mt-0 mx-0 mb-[24px] text-stone text-[clamp(14px,1.35vw,18px)] leading-[1.6]">TBD</p>
            </div>
          </section>

          <section
            className={`min-h-[calc(100vh-clamp(68px,9vh,96px))] min-h-[calc(100svh-clamp(68px,9vh,96px))] p-[clamp(24px,4vw,56px)] max-[720px]:px-[18px] max-[720px]:pt-[28px] max-[720px]:pb-[40px] max-[430px]:px-[12px] max-[430px]:pt-[46px] max-[430px]:pb-[34px] ${
              activePage === "brain" ? "grid items-center" : "hidden"
            }`}
            aria-hidden={activePage !== "brain"}
          >
            <div className="w-[min(100%,1040px)] min-w-0 p-[clamp(24px,4vw,44px)] border-[0.5px] border-tan/40 rounded-[clamp(16px,2vw,26px)] bg-cream/85 backdrop-blur-[10px] max-[720px]:w-full max-[720px]:min-h-auto max-[430px]:p-[24px] max-[430px]:w-[calc(100vw-24px)] max-[430px]:max-w-[calc(100vw-24px)]">
              <h2 className="mt-0 mx-0 mb-[6px] text-charcoal text-[clamp(28px,4vw,48px)] font-medium">Brain 🧠</h2>
              <p className="mt-0 mx-0 mb-[24px] text-stone text-[clamp(14px,1.35vw,18px)] leading-[1.6]">
                Random things to get to know me better.
              </p>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(210px,100%),1fr))] gap-[clamp(12px,1.5vw,18px)]">
                <div className="p-[clamp(18px,2vw,26px)] rounded-xl bg-surface/70">
                  <div className="mb-[10px] text-[20px]">♣️</div>
                  <div className="mb-[6px] text-charcoal text-[13px] font-medium">Poker</div>
                  <div className="text-stone text-[12px] leading-[1.6]">
                    Recreational player. Obsessed with GTO and hand equity math.
                  </div>
                </div>
                <div className="p-[clamp(18px,2vw,26px)] rounded-xl bg-surface/70">
                  <div className="mb-[10px] text-[20px]">🏃</div>
                  <div className="mb-[6px] text-charcoal text-[13px] font-medium">Running</div>
                  <div className="text-stone text-[12px] leading-[1.6]">
                    Morning runs for the BDNF. It actually works.
                  </div>
                </div>
                <div className="p-[clamp(18px,2vw,26px)] rounded-xl bg-surface/70">
                  <div className="mb-[10px] text-[20px]">🧠</div>
                  <div className="mb-[6px] text-charcoal text-[13px] font-medium">Neuro nerd</div>
                  <div className="text-stone text-[12px] leading-[1.6]">
                    Sleep science, working memory, cognitive performance.
                  </div>
                </div>
                <div className="p-[clamp(18px,2vw,26px)] rounded-xl bg-surface/70">
                  <div className="mb-[10px] text-[20px]">📚</div>
                  <div className="mb-[6px] text-charcoal text-[13px] font-medium">Philosophy</div>
                  <div className="text-stone text-[12px] leading-[1.6]">
                    I like asking &quot;why&quot; until someone gets annoyed.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className={`min-h-[calc(100vh-clamp(68px,9vh,96px))] min-h-[calc(100svh-clamp(68px,9vh,96px))] p-[clamp(24px,4vw,56px)] max-[720px]:px-[18px] max-[720px]:pt-[28px] max-[720px]:pb-[40px] max-[430px]:px-[12px] max-[430px]:pt-[46px] max-[430px]:pb-[34px] ${
              activePage === "talk" ? "grid items-center" : "hidden"
            }`}
            aria-hidden={activePage !== "talk"}
          >
            <div className="w-[min(100%,1040px)] min-w-0 p-[clamp(24px,4vw,44px)] border-[0.5px] border-tan/40 rounded-[clamp(16px,2vw,26px)] bg-cream/85 backdrop-blur-[10px] max-[720px]:w-full max-[720px]:min-h-auto max-[430px]:p-[24px] max-[430px]:w-[calc(100vw-24px)] max-[430px]:max-w-[calc(100vw-24px)]">
              <h2 className="mt-0 mx-0 mb-[6px] text-charcoal text-[clamp(28px,4vw,48px)] font-medium">Talk? 🎄</h2>
              <p className="mt-0 mx-0 mb-[24px] text-stone text-[clamp(14px,1.35vw,18px)] leading-[1.6]">
                Whether it&apos;s a project, opportunity, or just to chat, I&apos;m
                around.
              </p>
              <div className="max-w-[560px]">
                <label className="block mb-[16px]">
                  <span className="block mb-[6px] text-stone text-[12px]">Name</span>
                  <input
                    className="w-full px-[12px] py-[9px] border-[0.5px] border-tan/50 rounded-lg outline-none bg-surface/70 text-charcoal text-[13px]"
                    placeholder="Your name"
                    type="text"
                  />
                </label>
                <label className="block mb-[16px]">
                  <span className="block mb-[6px] text-stone text-[12px]">Email</span>
                  <input
                    className="w-full px-[12px] py-[9px] border-[0.5px] border-tan/50 rounded-lg outline-none bg-surface/70 text-charcoal text-[13px]"
                    placeholder="you@example.com"
                    type="email"
                  />
                </label>
                <label className="block mb-[16px]">
                  <span className="block mb-[6px] text-stone text-[12px]">Message</span>
                  <textarea
                    className="w-full px-[12px] py-[9px] border-[0.5px] border-tan/50 rounded-lg outline-none bg-surface/70 text-charcoal text-[13px] min-h-[100px] resize-y"
                    placeholder="What's on your mind?"
                  />
                </label>
                <a
                  className="inline-flex items-center justify-center min-h-[44px] px-[22px] py-[10px] rounded-lg cursor-pointer text-[clamp(14px,1.25vw,17px)] font-medium border-none bg-red text-cream max-[430px]:w-full w-full"
                  href="mailto:hello@example.com"
                >
                  Send it
                </a>
                <div className="flex flex-wrap gap-[10px] mt-[24px]">
                  <button className="cursor-pointer px-[14px] py-[7px] border-[0.5px] border-tan/50 rounded-[20px] bg-transparent text-stone text-[12px]" type="button">
                    GitHub
                  </button>
                  <button className="cursor-pointer px-[14px] py-[7px] border-[0.5px] border-tan/50 rounded-[20px] bg-transparent text-stone text-[12px]" type="button">
                    LinkedIn
                  </button>
                  <a className="cursor-pointer px-[14px] py-[7px] border-[0.5px] border-tan/50 rounded-[20px] bg-transparent text-stone text-[12px]" href="mailto:hello@example.com">
                    Email
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function drawScene(
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

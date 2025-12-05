import React, { useEffect, useRef } from "react";

interface RainEffectsProps {
  width: number;
  height: number;
}

const RainEffects: React.FC<RainEffectsProps> = ({ width, height }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sparkles = 500;
    const colour = "random";

    let x = 400,
      y = 300,
      ox = 400,
      oy = 300;
    let swide = width,
      shigh = height,
      sleft = 0,
      sdown = 0;

    const tiny: HTMLDivElement[] = [];
    const star: HTMLDivElement[] = [];
    const starv: number[] = new Array(sparkles).fill(0);
    const starx: number[] = [];
    const stary: number[] = [];
    const tinyx: number[] = [];
    const tinyy: number[] = [];
    const tinyv: number[] = new Array(sparkles).fill(0);

    const newColour = () => {
      const c = [
        255,
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 128),
      ];
      c.sort(() => 0.5 - Math.random());
      return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    };

    const createDiv = (height: number, width: number) => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.height = `${height}px`;
      div.style.width = `${width}px`;
      div.style.overflow = "hidden";
      div.style.zIndex = "9999";
      return div;
    };

    const setDimensions = () => {
      swide = width;
      shigh = height;
    };

    const sparkle = () => {
      if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
        ox = x;
        oy = y;

        for (let c = 0; c < sparkles; c++) {
          if (!starv[c]) {
            star[c].style.left = `${(starx[c] = x)}px`;
            star[c].style.top = `${(stary[c] = y + 1)}px`;
            star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
            const color = colour === "random" ? newColour() : colour;
            star[c].childNodes[0].nodeType === 1 &&
              ((star[c].childNodes[0] as HTMLElement).style.backgroundColor =
                color);
            star[c].childNodes[1].nodeType === 1 &&
              ((star[c].childNodes[1] as HTMLElement).style.backgroundColor =
                color);
            star[c].style.visibility = "visible";
            starv[c] = 50;
            break;
          }
        }
      }

      for (let c = 0; c < sparkles; c++) {
        if (starv[c]) updateStar(c);
        if (tinyv[c]) updateTiny(c);
      }

      requestAnimationFrame(sparkle);
    };

    const updateStar = (i: number) => {
      if (--starv[i] === 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
      if (starv[i]) {
        stary[i] += 1 + Math.random() * 3;
        starx[i] += ((i % 5) - 2) / 5;

        if (stary[i] < shigh + sdown) {
          star[i].style.top = `${stary[i]}px`;
          star[i].style.left = `${starx[i]}px`;
        } else {
          star[i].style.visibility = "hidden";
          starv[i] = 0;
        }
      } else {
        tinyv[i] = 50;
        tiny[i].style.top = `${(tinyy[i] = stary[i])}px`;
        tiny[i].style.left = `${(tinyx[i] = starx[i])}px`;
        tiny[i].style.width = "2px";
        tiny[i].style.height = "2px";
        tiny[i].style.backgroundColor = (
          star[i].childNodes[0] as HTMLElement
        ).style.backgroundColor;
        star[i].style.visibility = "hidden";
        tiny[i].style.visibility = "visible";
      }
    };

    const updateTiny = (i: number) => {
      if (--tinyv[i] === 25) {
        tiny[i].style.width = "1px";
        tiny[i].style.height = "1px";
      }
      if (tinyv[i]) {
        tinyy[i] += 1 + Math.random() * 3;
        tinyx[i] += ((i % 5) - 2) / 5;
        if (tinyy[i] < shigh + sdown) {
          tiny[i].style.top = `${tinyy[i]}px`;
          tiny[i].style.left = `${tinyx[i]}px`;
        } else {
          tiny[i].style.visibility = "hidden";
          tinyv[i] = 0;
        }
      } else {
        tiny[i].style.visibility = "hidden";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;

      // 영역 밖이면 x,y를 영역 안으로 제한 (클램핑)
      if (x < 0) x = 0;
      if (x > swide) x = swide;
      if (y < 0) y = 0;
      if (y > shigh) y = shigh;
    };

    // Initialize stars inside container
    if (!containerRef.current) return;

    for (let i = 0; i < sparkles; i++) {
      const t = createDiv(3, 3);
      t.style.visibility = "hidden";
      containerRef.current.appendChild(t);
      tiny[i] = t;

      const s = createDiv(5, 5);
      s.style.backgroundColor = "transparent";
      s.style.visibility = "hidden";

      const h = createDiv(1, 5);
      const v = createDiv(5, 1);
      h.style.top = "2px";
      v.style.left = "2px";

      s.appendChild(h);
      s.appendChild(v);
      containerRef.current.appendChild(s);
      star[i] = s;
    }

    window.addEventListener("resize", setDimensions);
    containerRef.current.addEventListener("mousemove", handleMouseMove);

    setDimensions();
    sparkle();

    return () => {
      window.removeEventListener("resize", setDimensions);
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      tiny.forEach((el) => el.remove());
      star.forEach((el) => el.remove());
    };
  }, [width, height]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default RainEffects;

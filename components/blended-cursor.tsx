"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";

const STATE = { DEFAULT: 0, HOVER: 1, TEXT: 2 } as const;

// ── Semi-implicit Euler spring with sub-stepping for stability ──
function createSpring(stiffness: number, damping: number, mass: number) {
  let cur = 0, vel = 0, tgt = 0;
  return {
    set(t: number) { tgt = t; },
    get() { return cur; },
    snap(t: number) { tgt = t; cur = t; vel = 0; },
    tick(dt: number) {
      const steps = 3;
      const h = Math.min(dt, 0.032) / steps;
      for (let i = 0; i < steps; i++) {
        const a = (-stiffness * (cur - tgt) - damping * vel) / mass;
        vel += a * h;
        cur += vel * h;
      }
    },
  };
}

function dlerp(a: number, b: number, halfLife: number, dt: number) {
  return a + (b - a) * (1 - Math.pow(2, -dt / halfLife));
}

const LINK_SELECTOR =
  "a:not([data-no-cursor]), button:not([data-no-cursor]), .cursor-pointer:not([data-no-cursor]), [role='button']:not([data-no-cursor])";
const TEXT_SELECTOR = "p, span, h1, h2, h3, h4, h5, h6, textarea, input";

const FILTER_BOX = 400;

export default function BlendedCursor() {
  const mainRef    = useRef<HTMLDivElement>(null);
  const trail1Ref  = useRef<HTMLDivElement>(null);
  const trail2Ref  = useRef<HTMLDivElement>(null);
  const filterRef  = useRef<HTMLDivElement>(null);

  const state = useRef({
    mode: STATE.DEFAULT as number,
    clicked: false,
    hoverEl: null as HTMLElement | null,
    hoverW: 80, hoverH: 80, hoverBR: "50%",
    curW: 24, curH: 24, curScale: 1, curBR: 50,
    t1W: 16, t1H: 16, t1Scale: 1, t1Opacity: 1,
    t2W: 16, t2H: 16, t2Scale: 1, t2Opacity: 1,
    mx: 0, my: 0,
  });

  const springs = useMemo(() => ({
    x:  createSpring(450, 32, 0.4), // Snappy but controlled
    y:  createSpring(450, 32, 0.4),
    x2: createSpring(280, 26, 0.6),
    y2: createSpring(280, 26, 0.6),
    x3: createSpring(180, 28, 0.8),
    y3: createSpring(180, 28, 0.8),
  }), []);

  const onMove = useCallback((e: MouseEvent) => {
    state.current.mx = e.clientX;
    state.current.my = e.clientY;
  }, []);

  const onOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const s = state.current;

    if (target.closest('[data-no-cursor]')) {
      s.mode = STATE.DEFAULT;
      s.hoverEl = null;
      return;
    }

    const link = target.closest(LINK_SELECTOR) as HTMLElement | null;
    if (link) {
      s.mode = STATE.HOVER;
      s.hoverEl = link;
      const r = link.getBoundingClientRect();
      const cs = getComputedStyle(link);
      s.hoverW = r.width + 12;
      s.hoverH = r.height + 12;
      s.hoverBR = cs.borderRadius === "0px" ? "8px" : cs.borderRadius;
      return;
    }
    if (target.closest(TEXT_SELECTOR)) {
      s.mode = STATE.TEXT;
      s.hoverEl = null;
      return;
    }
    s.mode = STATE.DEFAULT;
    s.hoverEl = null;
  }, []);

  const onDown = useCallback(() => { state.current.clicked = true; }, []);
  const onUp   = useCallback(() => { state.current.clicked = false; }, []);

  useEffect(() => {
    const isTouch = typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    if (isTouch) return;

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    let prev = performance.now();
    let raf = 0;

    const HL_ENTER = 0.05;
    const HL_LEAVE = 0.12;
    const HL_DEFAULT = 0.08;
    const HALF = FILTER_BOX * 0.5;

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.032);
      prev = now;
      const s = state.current;
      const sp = springs;

      // ── Detect if target scrolled away from stationary mouse ──
      if (s.mode === STATE.HOVER && s.hoverEl) {
        const r = s.hoverEl.getBoundingClientRect();
        // Add a slight tolerance padding
        const pad = 10;
        if (s.mx < r.left - pad || s.mx > r.right + pad || s.my < r.top - pad || s.my > r.bottom + pad) {
          // Element scrolled out from under the pointer
          s.mode = STATE.DEFAULT;
          s.hoverEl = null;
        }
      }

      // ── Calculate targets every frame to support scrolling ──
      if (s.mode === STATE.HOVER && s.hoverEl) {
        const r = s.hoverEl.getBoundingClientRect();
        const cx = r.left + r.width * 0.5;
        const cy = r.top  + r.height * 0.5;
        
        const dx = cx - s.mx;
        const dy = cy - s.my;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // Elastic snapping: Pull toward center but stay connected to cursor
        const MAX_STRETCH = 70; 
        const pull = Math.min(dist, MAX_STRETCH) / (dist || 1);
        
        sp.x.set(s.mx + dx * pull);
        sp.y.set(s.my + dy * pull);
        
        sp.x2.set(s.mx);
        sp.y2.set(s.my);
        sp.x3.set(s.mx);
        sp.y3.set(s.my);
      } else {
        sp.x.set(s.mx);
        sp.y.set(s.my);
        sp.x2.set(s.mx);
        sp.y2.set(s.my);
        sp.x3.set(s.mx);
        sp.y3.set(s.my);
      }

      sp.x.tick(dt);  sp.y.tick(dt);
      sp.x2.tick(dt); sp.y2.tick(dt);
      sp.x3.tick(dt); sp.y3.tick(dt);

      let tW: number, tH: number, tScale: number, tBR: number;
      let trailSize: number, trailOpacity: number;
      let hl: number;

      if (s.mode === STATE.HOVER) {
        tW = s.hoverW; tH = s.hoverH;
        tScale = s.clicked ? 0.94 : 1;
        tBR = parseFloat(s.hoverBR) || 50;
        trailSize = 8; 
        trailOpacity = 0.5;
        hl = HL_ENTER;
      } else if (s.mode === STATE.TEXT) {
        tW = 4; tH = 36;
        tScale = s.clicked ? 0.8 : 1;
        tBR = 2;
        trailSize = 0; trailOpacity = 0;
        hl = HL_DEFAULT;
      } else {
        tW = 24; tH = 24;
        tScale = s.clicked ? 0.5 : 1;
        tBR = 50;
        trailSize = 16; trailOpacity = 1;
        hl = HL_LEAVE;
      }

      s.curW     = dlerp(s.curW,     tW,     hl, dt);
      s.curH     = dlerp(s.curH,     tH,     hl, dt);
      s.curScale = dlerp(s.curScale, tScale, hl, dt);
      s.curBR    = dlerp(s.curBR,    tBR,    hl, dt);

      const trailHl = s.mode === STATE.HOVER ? HL_ENTER : HL_LEAVE;
      s.t1W       = dlerp(s.t1W,       trailSize,    trailHl, dt);
      s.t1H       = dlerp(s.t1H,       trailSize,    trailHl, dt);
      s.t1Scale   = dlerp(s.t1Scale,   trailOpacity, trailHl, dt);
      s.t1Opacity = dlerp(s.t1Opacity, trailOpacity, trailHl, dt);
      s.t2W       = dlerp(s.t2W,       trailSize,    trailHl, dt);
      s.t2H       = dlerp(s.t2H,       trailSize,    trailHl, dt);
      s.t2Scale   = dlerp(s.t2Scale,   trailOpacity, trailHl, dt);
      s.t2Opacity = dlerp(s.t2Opacity, trailOpacity, trailHl, dt);

      if (filterRef.current) {
        const fx = s.mx - HALF;
        const fy = s.my - HALF;
        filterRef.current.style.transform = `translate3d(${fx}px,${fy}px,0)`;
      }

      const boxX = s.mx - HALF;
      const boxY = s.my - HALF;

      if (mainRef.current) {
        const el = mainRef.current;
        const lx = sp.x.get() - boxX;
        const ly = sp.y.get() - boxY;
        el.style.transform = `translate3d(${lx}px,${ly}px,0) translate(-50%,-50%) scale(${s.curScale})`;
        el.style.width  = s.curW + "px";
        el.style.height = s.curH + "px";
        el.style.borderRadius = s.curBR + "px";
      }
      if (trail1Ref.current) {
        const el = trail1Ref.current;
        const lx = sp.x2.get() - boxX;
        const ly = sp.y2.get() - boxY;
        el.style.transform = `translate3d(${lx}px,${ly}px,0) translate(-50%,-50%) scale(${s.t1Scale})`;
        el.style.width   = s.t1W + "px";
        el.style.height  = s.t1H + "px";
        el.style.opacity = "" + s.t1Opacity;
      }
      if (trail2Ref.current) {
        const el = trail2Ref.current;
        const lx = sp.x3.get() - boxX;
        const ly = sp.y3.get() - boxY;
        el.style.transform = `translate3d(${lx}px,${ly}px,0) translate(-50%,-50%) scale(${s.t2Scale})`;
        el.style.width   = s.t2W + "px";
        el.style.height  = s.t2H + "px";
        el.style.opacity = "" + s.t2Opacity;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, [springs, onMove, onOver, onDown, onUp]);

  return (
    <>
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="over" />
          </filter>
        </defs>
      </svg>

      <div
        className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
        style={{ mixBlendMode: "difference" }}
      >
        <div
          ref={filterRef}
          className="absolute top-0 left-0 will-change-transform"
          style={{
            width: FILTER_BOX,
            height: FILTER_BOX,
            filter: "url(#gooey)",
            overflow: "hidden",
            contain: "strict",
          }}
        >
          <div ref={trail2Ref} className="absolute top-0 left-0 bg-white rounded-full" style={{ width: 16, height: 16 }} />
          <div ref={trail1Ref} className="absolute top-0 left-0 bg-white rounded-full" style={{ width: 16, height: 16 }} />
          <div ref={mainRef}   className="absolute top-0 left-0 bg-white rounded-full" style={{ width: 24, height: 24 }} />
        </div>
      </div>
    </>
  );
}

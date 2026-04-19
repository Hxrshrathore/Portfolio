"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";

// ── Cursor state enum (avoids string comparisons in hot path) ──
const STATE = { DEFAULT: 0, HOVER: 1, TEXT: 2 } as const;

// ── Spring math: critically-damped numeric spring solved per-frame ──
// F = -k·(x - target) - d·v   →   Verlet-style integration
// This replaces 6 framer-motion useSpring instances with pure arithmetic.
function createSpring(stiffness: number, damping: number, mass: number) {
  let current = 0;
  let velocity = 0;
  let target = 0;

  return {
    set(t: number) { target = t; },
    get()  { return current; },
    tick(dt: number) {
      // Clamp dt to prevent spiral-of-death on tab-switch
      const s = Math.min(dt, 0.032);
      const force = -stiffness * (current - target);
      const damp  = -damping * velocity;
      const accel = (force + damp) / mass;
      velocity += accel * s;
      current  += velocity * s;
    },
  };
}

// ── Lerp helper for smooth size/scale interpolation ──
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ── Cursor selector (cached once, never re-built) ──
const LINK_SELECTOR =
  "a:not([data-no-cursor]), button:not([data-no-cursor]), .cursor-pointer:not([data-no-cursor]), [role='button']:not([data-no-cursor])";
const TEXT_SELECTOR = "p, span, h1, h2, h3, h4, h5, h6, textarea, input";

export default function BlendedCursor() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const mainRef   = useRef<HTMLDivElement>(null);
  const trail1Ref = useRef<HTMLDivElement>(null);
  const trail2Ref = useRef<HTMLDivElement>(null);

  // All mutable state lives in a ref — zero re-renders in the hot path
  const state = useRef({
    mode: STATE.DEFAULT as number,
    clicked: false,
    hoverEl: null as HTMLElement | null,
    hoverW: 80, hoverH: 80, hoverBR: "50%",
    // Current interpolated visual sizes
    curW: 24, curH: 24, curScale: 1, curBR: 50, // 50 = "50%" as number for lerp
    t1W: 16, t1H: 16, t1Scale: 1, t1Opacity: 1,
    t2W: 16, t2H: 16, t2Scale: 1, t2Opacity: 1,
  });

  // Springs — created once via useMemo, stable across renders
  const springs = useMemo(() => ({
    // Main head
    x: createSpring(150, 20, 0.5),
    y: createSpring(150, 20, 0.5),
    // Trail 1 (slightly heavier)
    x2: createSpring(120, 24, 0.7),
    y2: createSpring(120, 24, 0.7),
    // Trail 2 (heaviest — most drag)
    x3: createSpring(90, 28, 0.9),
    y3: createSpring(90, 28, 0.9),
  }), []);

  // ── Mouse handlers (stable refs, no state updates) ──
  const onMove = useCallback((e: MouseEvent) => {
    const s = state.current;
    const sp = springs;

    if (s.hoverEl) {
      // Magnetic snap → main head locks to button center
      const r = s.hoverEl.getBoundingClientRect();
      const cx = r.left + r.width * 0.5;
      const cy = r.top  + r.height * 0.5;
      sp.x.set(cx);
      sp.y.set(cy);
      // Trails follow real mouse (venom tension)
      sp.x2.set(e.clientX);
      sp.y2.set(e.clientY);
      sp.x3.set(e.clientX);
      sp.y3.set(e.clientY);
    } else {
      sp.x.set(e.clientX);
      sp.y.set(e.clientY);
      sp.x2.set(e.clientX);
      sp.y2.set(e.clientY);
      sp.x3.set(e.clientX);
      sp.y3.set(e.clientY);
    }
  }, [springs]);

  const onOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const s = state.current;

    const link = target.closest(LINK_SELECTOR) as HTMLElement | null;
    if (link) {
      s.mode = STATE.HOVER;
      s.hoverEl = link;
      const r = link.getBoundingClientRect();
      const cs = getComputedStyle(link);
      s.hoverW = r.width + 16;
      s.hoverH = r.height + 16;
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
    // Skip on touch-only devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    // ── RAF loop: all visual updates happen here, off React's render cycle ──
    let prev = performance.now();
    let raf = 0;

    const LERP_SPEED = 0.12; // Smooth interpolation factor per frame

    const tick = (now: number) => {
      const dt = (now - prev) / 1000; // seconds
      prev = now;
      const s = state.current;
      const sp = springs;

      // 1. Tick all springs (pure math)
      sp.x.tick(dt);  sp.y.tick(dt);
      sp.x2.tick(dt); sp.y2.tick(dt);
      sp.x3.tick(dt); sp.y3.tick(dt);

      // 2. Compute target visual properties based on mode
      let tW: number, tH: number, tScale: number, tBR: number;
      let trailTarget: number, trailOpacity: number;

      if (s.mode === STATE.HOVER) {
        tW = s.hoverW;
        tH = s.hoverH;
        tScale = s.clicked ? 0.95 : 1;
        tBR = parseFloat(s.hoverBR) || 50;
        trailTarget = 0;
        trailOpacity = 0;
      } else if (s.mode === STATE.TEXT) {
        tW = 4;
        tH = 38;
        tScale = s.clicked ? 0.8 : 1;
        tBR = 2;
        trailTarget = 0;
        trailOpacity = 0;
      } else {
        tW = 24;
        tH = 24;
        tScale = s.clicked ? 0.4 : 1;
        tBR = 50;
        trailTarget = 16;
        trailOpacity = 1;
      }

      // 3. Lerp current values toward targets (smooth morphing)
      s.curW     = lerp(s.curW,     tW,     LERP_SPEED);
      s.curH     = lerp(s.curH,     tH,     LERP_SPEED);
      s.curScale = lerp(s.curScale, tScale, LERP_SPEED);
      s.curBR    = lerp(s.curBR,    tBR,    LERP_SPEED);

      s.t1W       = lerp(s.t1W,       trailTarget,  LERP_SPEED);
      s.t1H       = lerp(s.t1H,       trailTarget,  LERP_SPEED);
      s.t1Scale   = lerp(s.t1Scale,   trailOpacity, LERP_SPEED);
      s.t1Opacity = lerp(s.t1Opacity, trailOpacity,  LERP_SPEED);
      s.t2W       = lerp(s.t2W,       trailTarget,  LERP_SPEED);
      s.t2H       = lerp(s.t2H,       trailTarget,  LERP_SPEED);
      s.t2Scale   = lerp(s.t2Scale,   trailOpacity, LERP_SPEED);
      s.t2Opacity = lerp(s.t2Opacity, trailOpacity,  LERP_SPEED);

      // 4. Apply transforms directly to DOM (no React re-render)
      if (mainRef.current) {
        const el = mainRef.current;
        el.style.transform = `translate3d(${sp.x.get()}px, ${sp.y.get()}px, 0) translate(-50%, -50%) scale(${s.curScale})`;
        el.style.width  = `${s.curW}px`;
        el.style.height = `${s.curH}px`;
        el.style.borderRadius = `${s.curBR}px`;
      }
      if (trail1Ref.current) {
        const el = trail1Ref.current;
        el.style.transform = `translate3d(${sp.x2.get()}px, ${sp.y2.get()}px, 0) translate(-50%, -50%) scale(${s.t1Scale})`;
        el.style.width   = `${s.t1W}px`;
        el.style.height  = `${s.t1H}px`;
        el.style.opacity = `${s.t1Opacity}`;
      }
      if (trail2Ref.current) {
        const el = trail2Ref.current;
        el.style.transform = `translate3d(${sp.x3.get()}px, ${sp.y3.get()}px, 0) translate(-50%, -50%) scale(${s.t2Scale})`;
        el.style.width   = `${s.t2W}px`;
        el.style.height  = `${s.t2H}px`;
        el.style.opacity = `${s.t2Opacity}`;
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
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="over" />
          </filter>
        </defs>
      </svg>

      <div
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
        style={{ mixBlendMode: "difference" }}
      >
        <div className="absolute inset-0" style={{ filter: "url(#gooey)" }}>
          {/* Trail 2 (heaviest drag) */}
          <div
            ref={trail2Ref}
            className="absolute top-0 left-0 bg-white rounded-full will-change-transform"
            style={{ width: 16, height: 16 }}
          />
          {/* Trail 1 */}
          <div
            ref={trail1Ref}
            className="absolute top-0 left-0 bg-white rounded-full will-change-transform"
            style={{ width: 16, height: 16 }}
          />
          {/* Main head */}
          <div
            ref={mainRef}
            className="absolute top-0 left-0 bg-white rounded-full will-change-transform"
            style={{ width: 24, height: 24 }}
          />
        </div>
      </div>
    </>
  );
}

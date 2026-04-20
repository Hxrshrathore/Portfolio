export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // in cents
  category: "Templates" | "Assets" | "Components";
  images: string[];
  features: string[];
  demoUrl?: string;
  downloadUrl?: string;
  tags: string[];
  featured: boolean;
  // Component specific
  code?: string;
  sandboxId?: string;
  isFree?: boolean;
}

export const shopProducts: Product[] = [
  {
    id: "1",
    slug: "architectural-portfolio-template",
    name: "Architectural Portfolio V1",
    description: "A premium, math-driven portfolio template designed for creative developers and architects. Features smooth Lenis scrolling, Framer Motion animations, and a high-end typography system.",
    price: 4900, // $49.00
    category: "Templates",
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"],
    features: ["Next.js & TypeScript", "Tailwind CSS & Framer Motion", "Interactive 3D Backgrounds", "Fully Responsive"],
    demoUrl: "https://portfolio-demo.example.com",
    tags: ["Next.js", "Portfolio", "Premium"],
    featured: true,
  },
  {
    id: "5",
    slug: "plasma-wave-background",
    name: "Plasma Wave Background",
    description: "A high-performance WebGL-powered plasma wave background. Utilizing GPU-accelerated math for smooth, fluid animations that respond to parameters in real-time.",
    price: 0, 
    isFree: true,
    category: "Components",
    images: ["https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop"],
    features: ["WebGL & OGL Powered", "Customizable Colors", "GPU Accelerated", "Next.js & React Ready"],
    code: `import { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Geometry } from 'ogl';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

const VERT = \`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const FRAG = \`
precision mediump float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  uOffset;
uniform float uRotation;
uniform float uFocalLength;
uniform float uSpeed1;
uniform float uSpeed2;
uniform float uDir2;
uniform float uBend1;
uniform float uBend2;
uniform vec3  uColor1;
uniform vec3  uColor2;

const float lt   = 0.3;
const float pi   = 3.14159;
const float pi2  = 6.28318;
const float pi_2 = 1.5708;
#define MAX_STEPS 14

void mainImage(out vec4 C, in vec2 U) {
  float t = iTime * pi;
  float s = 1.0;
  float d = 0.0;
  vec2  R = iResolution;

  vec3 o = vec3(0.0, 0.0, -7.0);
  vec3 u = normalize(vec3((U - 0.5 * R) / R.y, uFocalLength));
  vec2 k = vec2(0.0);
  vec3 p;

  float t1 = t * 0.7;
  float t2 = t * 0.9;
  float tSpeed1 = t * uSpeed1;
  float tSpeed2 = t * uSpeed2 * uDir2;

  for (int i = 0; i < MAX_STEPS; ++i) {
    p = o + u * d;
    p.x -= 15.0;

    float px = p.x;
    float wob1 = uBend1 + sin(t1 + px * 0.8) * 0.1;
    float wob2 = uBend2 + cos(t2 + px * 1.1) * 0.1;

    float px2 = px + pi_2;
    vec2 sinOffset = sin(vec2(px, px2) + tSpeed1) * wob1;
    vec2 cosOffset = cos(vec2(px, px2) + tSpeed2) * wob2;

    vec2 yz = p.yz;
    float pxLt = px + lt;
    k.x = max(pxLt, length(yz - sinOffset) - lt);
    k.y = max(pxLt, length(yz - cosOffset) - lt);

    float current = min(k.x, k.y);
    s = min(s, current);
    if (s < 0.001 || d > 300.0) break;
    d += s * 0.7;
  }

  float sqrtD = sqrt(d);
  vec3 raw = max(cos(d * pi2) - s * sqrtD - vec3(k, 0.0), 0.0);
  raw.gb += 0.1;
  float maxC = max(raw.r, max(raw.g, raw.b));
  if (maxC < 0.15) discard;
  raw = raw * 0.4 + raw.brg * 0.6 + raw * raw;
  float lum = dot(raw, vec3(0.299, 0.587, 0.114));
  float w1 = max(0.0, 1.0 - k.x * 2.0);
  float w2 = max(0.0, 1.0 - k.y * 2.0);
  float wt = w1 + w2 + 0.001;
  vec3 c = (uColor1 * w1 + uColor2 * w2) / wt * lum * 3.5;
  C = vec4(c, 1.0);
}

void main() {
  vec2 coord = gl_FragCoord.xy + uOffset;
  coord -= 0.5 * iResolution;
  float c = cos(uRotation), s = sin(uRotation);
  coord = mat2(c, -s, s, c) * coord;
  coord += 0.5 * iResolution;

  vec4 color;
  mainImage(color, coord);
  gl_FragColor = color;
}
\`;

export default function PlasmaWave(props) {
  const {
    xOffset = 0,
    yOffset = 0,
    rotationDeg = 0,
    focalLength = 0.8,
    speed1 = 0.05,
    speed2 = 0.05,
    dir2 = 1.0,
    bend1 = 1,
    bend2 = 0.5,
    colors = ['#A855F7', '#06B6D4']
  } = props;

  const propsRef = useRef(props);
  propsRef.current = props;
  const containerRef = useRef(null);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 1.5),
      antialias: false,
    });

    const gl = renderer.gl;
    ctn.appendChild(gl.canvas);

    const camera = new Camera(gl);
    const scene = new Transform();

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) }
    });

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uOffset: { value: new Float32Array([xOffset, yOffset]) },
        uRotation: { value: (rotationDeg * Math.PI) / 180 },
        uFocalLength: { value: focalLength },
        uSpeed1: { value: speed1 },
        uSpeed2: { value: speed2 },
        uDir2: { value: dir2 },
        uBend1: { value: bend1 },
        uBend2: { value: bend2 },
        uColor1: { value: hexToRgb(colors[0]) },
        uColor2: { value: hexToRgb(colors[1]) }
      }
    });

    new Mesh(gl, { geometry, program }).setParent(scene);

    function resize() {
      if (!ctn) return;
      const { width, height } = ctn.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.iResolution.value[0] = width * renderer.dpr;
      program.uniforms.iResolution.value[1] = height * renderer.dpr;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(ctn);
    resize();

    let animateId;
    const update = (now) => {
      program.uniforms.iTime.value = now * 0.001;
      renderer.render({ scene, camera });
      animateId = requestAnimationFrame(update);
    };

    animateId = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(animateId);
      ro.disconnect();
      if (ctn && gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}`,
    tags: ["WebGL", "Animation", "Free"],
    featured: true,
  },
  {
    id: "2",
    slug: "liquid-chrome-component-kit",
    name: "Liquid Chrome UI Kit",
    description: "A collection of stunning WebGL-powered liquid chrome components. Includes backgrounds, buttons, and text effects to elevate your web projects.",
    price: 2900, // $29.00
    category: "Components",
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"],
    features: ["WebGL & OGL Integration", "React & Next.js Compatible", "Fully Customizable Parameters", "High Performance"],
    demoUrl: "https://liquid-chrome.example.com",
    tags: ["WebGL", "UI Kit", "Animation"],
    featured: true,
  },
  {
    id: "3",
    slug: "minimal-icon-pack-black",
    name: "Minimal Architectural Icons",
    description: "50+ high-quality vector icons designed with a focus on geometric precision and architectural clarity. Perfect for high-end portfolio websites.",
    price: 1500, // $15.00
    category: "Assets",
    images: ["https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"],
    features: ["Vector SVG Format", "Figma File Included", "Optimized for Web & Mobile", "Regular Updates"],
    tags: ["Icons", "Design", "Assets"],
    featured: false,
  },
  {
    id: "4",
    slug: "nexus-annotation-frontend-template",
    name: "Nexus Annotation UI",
    description: "The complete frontend architecture for an AI annotation tool. Optimized for vision models and large dataset labeling workflows.",
    price: 7900, // $79.00
    category: "Templates",
    images: ["https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop"],
    features: ["AI Tooling UI", "Zustand State Management", "Dynamic Image Cropping", "Batch Processing Support"],
    demoUrl: "https://nexus-ui.example.com",
    tags: ["AI", "SaaS", "Next.js"],
    featured: false,
  }
];

# 🚀 Next-Gen Interactive Developer Portfolio

A highly interactive, visually stunning, and performance-optimized developer portfolio built with modern web technologies. This project focuses on delivering a premium user experience through advanced WebGL graphics, complex animations, and fluid typography, all while maintaining accessibility and SEO best practices.

## ✨ Key Features

- **Immersive 3D Experiences**: Utilizes Three.js and React Three Fiber for dynamic backgrounds like "Liquid Chrome" and "Plasma Waves".
- **Advanced Animations**: Powered by Framer Motion and GSAP for scroll-triggered reveals, text pressure effects, and page transitions.
- **Smooth Scrolling**: Integrated Lenis for buttery-smooth, momentum-based scrolling across all devices.
- **Custom Interactive Elements**: Includes a gooey blended cursor, animated preloader, circular galleries, and infinite flowing menus.
- **Full-Stack Capabilities**: Features a blog, project case studies, and a functional shop/cart system backed by a serverless PostgreSQL database.
- **Magic Bento Grids**: Beautifully crafted bento box layouts for displaying skills, performance metrics, and design visuals.
- **Bug Reporting & Feedback**: Built-in interactive bug report widget for continuous user feedback.

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js (App Router)](https://nextjs.org/) - React 19
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & CSS Modules
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Animations & WebGL
- **Core Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Scroll & Complex Timelines**: [GSAP](https://gsap.com/)
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)
- **Lightweight WebGL**: [OGL](https://github.com/oframe/ogl)

### Backend & Data
- **Database**: [Neon (Serverless Postgres)](https://neon.tech/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Data Fetching**: Next.js Server Actions
- **Markdown Processing**: `react-markdown` & `remark-gfm` for blog posts

### Other Tools
- **Charts**: Recharts
- **Carousels**: Embla Carousel
- **Typography**: `geist` font, Rough Notation

## 📂 Project Structure

```text
.
├── app/                  # Next.js App Router pages (bio, blog, cart, contact, playground, projects, shop)
├── components/           # Reusable UI components and advanced animated sections
│   ├── ui/               # Base UI components (Radix primitives)
│   └── ...               # Custom complex components (Magic Bento, Flowing Menu, etc.)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions, database configuration, and schemas
├── public/               # Static assets (images, videos, fonts)
├── scripts/              # Utility scripts (e.g., db-push.ts)
└── styles/               # Global styles and tailwind configs
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- A [Neon database URL](https://neon.tech/) for Drizzle ORM

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hxrshrathore/Portfolio
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your necessary environment variables:
   ```env
   DATABASE_URL="your-neon-postgres-connection-string"
   # Add any other API keys required (e.g., for email sending, analytics, etc.)
   ```

4. **Initialize the database:**
   Push the schema to your Neon database using Drizzle:
   ```bash
   npm run db:push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠 Commands

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Runs the built app in production mode.
- `npm run lint`: Runs ESLint to catch formatting/logic errors.
- `npm run db:push`: Pushes Drizzle schema changes to the database.

## 🌐 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.
Make sure to add your `DATABASE_URL` and other necessary environment variables in the Vercel dashboard before deploying.
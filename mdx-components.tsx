import type React from "react"
import Image from "next/image"
import Link from "next/link"

export type MDXComponents = Record<string, React.ComponentType<any>>

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-4xl font-bold text-white mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-3xl font-bold text-white mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold text-white mb-3 mt-6">{children}</h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
    ),
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <Link href={href || "#"} className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
        {children}
      </Link>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="ml-4">{children}</li>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-400 my-4">{children}</blockquote>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm font-mono">{children}</code>
    ),
    pre: ({ children }: { children?: React.ReactNode }) => (
      <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-800">
        {children}
      </pre>
    ),
    img: (props: any) => (
      <Image {...props} width={800} height={400} className="rounded-lg my-6" alt={props.alt || ""} />
    ),
    hr: () => <hr className="border-gray-800 my-8" />,
    ...components,
  }
}

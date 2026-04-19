"use client"

import React from "react"
import Link, { type LinkProps } from "next/link"
import { usePageTransition } from "./page-transition"

type TransitionLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    children: React.ReactNode
  }

/**
 * Drop-in replacement for next/link that triggers the cinematic
 * curtain page transition instead of a hard navigation.
 */
export default function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
  const { navigateTo, isTransitioning } = usePageTransition()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let anchor hash links pass through normally
    const target = typeof href === "string" ? href : href.pathname ?? ""
    if (target.startsWith("#") || target.startsWith("http")) {
      onClick?.(e)
      return
    }

    e.preventDefault()
    onClick?.(e)

    if (!isTransitioning) {
      navigateTo(target)
    }
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}

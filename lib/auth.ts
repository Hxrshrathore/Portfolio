import crypto from "crypto"
import { cookies } from "next/headers"

/**
 * Perform a constant-time comparison of two strings using SHA-256 digests.
 * Hashing fixed 32-byte buffers eliminates length-leakage timing attacks.
 * Fails closed if either input is null, undefined, or empty.
 */
export function timingSafeCompare(a?: string | null, b?: string | null): boolean {
  if (!a || !b || typeof a !== "string" || typeof b !== "string") {
    return false
  }
  try {
    const hashA = crypto.createHash("sha256").update(a).digest()
    const hashB = crypto.createHash("sha256").update(b).digest()
    return crypto.timingSafeEqual(hashA, hashB)
  } catch (error) {
    console.error("[Auth] Error in timing-safe comparison:", error)
    return false
  }
}

/**
 * Retrieve the admin secret from the environment.
 * FAILS CLOSED: Returns null if unset or empty string. Never provides a default fallback.
 */
export function getAdminSecret(): string | null {
  const secret = process.env.ADMIN_SECRET?.trim()
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("[Auth Critical] ADMIN_SECRET is not configured in environment. Admin access is disabled.")
    }
    return null
  }
  return secret
}

/**
 * Retrieve the bridge secret from the environment.
 * FAILS CLOSED: Returns null if unset or empty string.
 */
export function getBridgeSecret(): string | null {
  const secret = process.env.BRIDGE_SECRET?.trim()
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("[Auth Critical] BRIDGE_SECRET is not configured in environment. Bridge access is disabled.")
    }
    return null
  }
  return secret
}

/**
 * Verify whether an admin token matches the configured ADMIN_SECRET.
 * Fails closed if ADMIN_SECRET is not set.
 */
export function isValidAdminToken(token?: string | null): boolean {
  const adminSecret = getAdminSecret()
  if (!adminSecret || !token) {
    return false
  }
  return timingSafeCompare(token, adminSecret)
}

/**
 * Verify whether a bridge token matches the configured BRIDGE_SECRET.
 * Fails closed if BRIDGE_SECRET is not set.
 */
export function isValidBridgeToken(token?: string | null): boolean {
  const bridgeSecret = getBridgeSecret()
  if (!bridgeSecret || !token) {
    return false
  }
  return timingSafeCompare(token, bridgeSecret)
}

/**
 * Server-side authorization check for Server Actions.
 * Throws an Error if the request is not authenticated.
 */
export async function verifyAdminAuth(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value

  if (!isValidAdminToken(token)) {
    throw new Error("Unauthorized access: administrative privileges required")
  }
}

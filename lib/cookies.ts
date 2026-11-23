export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"))
  return match ? decodeURIComponent(match[3]) : null
}

export function setCookie(name: string, value: string | number, days = 365) {
  if (typeof document === "undefined") return
  const maxAge = days * 24 * 60 * 60
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`
}

export function getSavedPosition(key: string, defaultVal: number): number {
  if (typeof window === "undefined") return defaultVal
  try {
    const fromCookie = getCookie(key)
    if (fromCookie !== null) {
      const val = parseFloat(fromCookie)
      if (!isNaN(val)) return val
    }
    const fromStorage = localStorage.getItem(key)
    if (fromStorage !== null) {
      const val = parseFloat(fromStorage)
      if (!isNaN(val)) return val
    }
  } catch {
    // ignore
  }
  return defaultVal
}

export function savePosition(key: string, val: number) {
  try {
    setCookie(key, val)
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, val.toString())
    }
  } catch {
    // ignore
  }
}


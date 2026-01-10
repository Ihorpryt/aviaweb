import { createContext, useContext, useEffect, useRef, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )
    const transitionTimeoutRef = useRef<number | null>(null)

    useEffect(() => {
        const root = window.document.documentElement

        const applyTheme = (resolvedTheme: "dark" | "light") => {
            root.classList.remove("light", "dark")
            root.classList.add(resolvedTheme)
        }

        if (theme === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
            const systemTheme = mediaQuery.matches ? "dark" : "light"
            applyTheme(systemTheme)

            // Listen for system preference changes
            const handleChange = (e: MediaQueryListEvent) => {
                applyTheme(e.matches ? "dark" : "light")
            }

            mediaQuery.addEventListener("change", handleChange)
            return () => mediaQuery.removeEventListener("change", handleChange)
        }

        applyTheme(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            const root = window.document.documentElement
            root.classList.add("theme-transition")
            if (transitionTimeoutRef.current !== null) {
                window.clearTimeout(transitionTimeoutRef.current)
            }
            transitionTimeoutRef.current = window.setTimeout(() => {
                root.classList.remove("theme-transition")
                transitionTimeoutRef.current = null
            }, 300)
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
    }

    return (
        <ThemeProviderContext.Provider value={value} >
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}

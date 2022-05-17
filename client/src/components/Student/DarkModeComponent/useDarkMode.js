import { useEffect, useState } from "react"

function useDarkMode() {
  const [theme, setTheme] = useState("light")
  const colorTheme = theme === "light" ? "dark" :"light"

  useEffect(()=>{
      const root = window.document.documentElement

      root.classList.add(theme)
      root.classList.remove(colorTheme)
  }, [setTheme, colorTheme])
  return [setTheme,colorTheme]
}

export default useDarkMode
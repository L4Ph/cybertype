import { useState } from 'react'

// bar color for each theme
export const themes = [
  { name: 'Espresso', bar: 'hsl(0deg 12% 8%)' },
  { name: 'Campfire', bar: 'hsl(216deg 5% 21%)' },
  { name: 'Classic', bar: 'hsl(57deg 14% 67%)' },
  { name: 'Halloween', bar: 'hsl(311deg 38% 6%)' },
  { name: 'Effervescent', bar: 'hsl(260deg 73% 66%)' },
  { name: 'Blackhole', bar: 'hsl(220deg 20% 3%)' },
  { name: 'Serendipity', bar: 'hsl(0deg 0% 16%)' },
  { name: 'Elixir', bar: 'hsl(243deg 55% 14%)' },
  { name: 'Eudaemonia', bar: 'hsl(53deg 7% 75%)' },
  { name: 'Tranquillity', bar: 'hsl(270deg 3% 85%)' },
  { name: 'Aesthete', bar: 'hsl(0deg 0% 13%)' },
  { name: 'Sunlit', bar: 'hsl(210deg 100% 30%)' },
  { name: 'Witchcraft', bar: 'hsl(205deg 37% 8%)' },
  { name: 'Mechanical', bar: 'hsl(210deg 11% 15%)' },
  { name: 'Night Owl', bar: 'hsl(258deg 53% 7%)' },
  { name: 'Forest', bar: 'hsl(198deg 100% 8%)' }
]

function getInitialTheme() {
  if (typeof window === 'undefined') return 0

  const valueFromSessionStorage = sessionStorage.getItem('theme')
  if (!valueFromSessionStorage) return 0

  const index = Number(valueFromSessionStorage)

  if (isNaN(index) || index < 0 || index >= themes.length) {
    sessionStorage.setItem('theme', '0')
    return 0
  }

  return index
}

function applyTheme(themeIndex: number) {
  document.body.setAttribute('data-theme', themeIndex + '')

  const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement
  meta.setAttribute('content', themes[themeIndex].bar)

  sessionStorage.setItem('theme', themeIndex + '')
}

export function useThemeIndex() {
  const [themeIndex, setThemeIndex] = useState(getInitialTheme)

  function _setThemeIndex(i: number) {
    setThemeIndex(i)
    applyTheme(i)
  }

  return [themeIndex, _setThemeIndex] as const
}

if (typeof window !== 'undefined') {
  const i = getInitialTheme()
  applyTheme(i)
}

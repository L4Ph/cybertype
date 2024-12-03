import { themes, useThemeIndex } from '../hooks/useThemeIndex'
import styles from '../styles/ThemeSwitcher.module.scss'

export function ThemeSwitcher({ handleClose }: { handleClose: () => void }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_themeIndex, setThemeIndex] = useThemeIndex()

  return (
    <div className={styles.themeSwitcher}>
      {themes.map((theme, i) => {
        return (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            data-theme={i}
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            onClick={() => {
              handleClose()
              setThemeIndex(i)
            }}
            className={styles.theme}
          >
            <h3> {theme.name}</h3>
            <div className={styles.palette} />
          </div>
        )
      })}
    </div>
  )
}

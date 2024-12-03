import { type Dispatch, memo } from 'react'
import type { Action, State } from '../lib/types'
import styles from '../styles/Settings.module.scss'
import { ClientOnly } from './ClientOnly'
import { PWAInstallButton } from './PWAInstallButton'
import {
  ChevronIcon,
  SoundDisabled,
  SoundEnabledIcon,
  SoundIcon,
  ThemeIcon
} from './icons'

type SettingsProps = {
  dispatch: Dispatch<Action>
  soundEnabled: boolean
  dataName: State['dataName']
}

export const Settings = memo(function Settings({
  dispatch,
  soundEnabled,
  dataName
}: SettingsProps) {
  return (
    <div className={styles.settings}>
      {/* data selector - client only because it is personalized  */}
      <ClientOnly>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className={styles.dataSelector}
          onClick={() => {
            dispatch({ type: 'setShowDataSelector', data: true })
          }}
        >
          {dataName}
          {ChevronIcon}
        </div>
      </ClientOnly>

      <div className={styles.icons}>
        {/* theme switcher */}
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          aria-label="Change Theme"
          onClick={() => dispatch({ type: 'setShowThemes', data: true })}
        >
          {ThemeIcon}
        </button>

        {/* sound */}
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          className={styles.sound}
          onClick={() => {
            dispatch({ type: 'setSoundEnabled', data: !soundEnabled })
          }}
          aria-label="toggle sound effects"
        >
          <ClientOnly ssr={SoundEnabledIcon}>
            {soundEnabled ? SoundEnabledIcon : SoundDisabled}
          </ClientOnly>
        </button>

        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={() => dispatch({ type: 'setShowSoundSelector', data: true })}
          aria-label="select key sound"
        >
          {SoundIcon}
        </button>

        <PWAInstallButton />
      </div>
    </div>
  )
})

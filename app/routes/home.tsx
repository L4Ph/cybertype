import { DynamicIsland } from '../components/DynamicIsland'
import { KeyStats } from '../components/Keyboard'
import { Loader } from '../components/Loader'
import { Nav } from '../components/Nav'
import { Words } from '../components/Words'
import { useData } from '../hooks/useData'
import { useKeys } from '../hooks/useKeys'
import { useTypingStarted } from '../hooks/useTyping'
import { useLocalStorage } from '../lib/localStorage'
import { useAppState } from '../lib/state'
import styles from '../styles/index.module.scss'

export default function Home() {
  const [state, dispatch] = useAppState()

  const targetKey =
    state.words.length === 0
      ? ''
      : state.words[state.progress.wordIndex][state.progress.charIndex]

  // ignore typing when dynamic island is expanded
  const ignoreTyping = state.showThemes || state.showDataSelector

  useData(state.dataName, dispatch)
  useKeys(targetKey, dispatch, state.soundEnabled, state.soundPack, ignoreTyping)
  useTypingStarted(state.typingStarted)
  useLocalStorage(state)

  return (
    <div className={styles.container}>
      <DynamicIsland state={state} dispatch={dispatch} />

      {/* if there is data to show and no other data is being fetched */}
      {state.data.length && !state.fetchingData ? (
        <>
          <Words
            words={state.words}
            progress={state.progress}
            errorLocations={state.errorLocations}
          />
        </>
      ) : (
        <Loader />
      )}

      <KeyStats keyStats={state.keyStats} />

      <div className={styles.tips}>
        <kbd>enter</kbd> to reset / change
      </div>

      <Nav />
    </div>
  )
}

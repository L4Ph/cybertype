import { useEffect } from 'react'
import { loadedData } from '../lib/state'
import type { Action, State } from '../lib/types'

function dataNameToFileName(dataName: string) {
  if (dataName === 'C#') return 'csharp'
  return dataName.toLowerCase().replace(/ /g, '-')
}

export function useData(dataName: State['dataName'], dispatch: React.Dispatch<Action>) {
  useEffect(() => {
    let isCancelled = false

    if (dataName in loadedData) {
      dispatch({
        type: 'setData',
        dataName: dataName,
        data: loadedData[dataName] as string[] // 型アサーション
      })
    } else {
      dispatch({ type: 'setFetchingData', data: true })

      const fileName = dataNameToFileName(dataName)

      fetch(`/json/${fileName}.json`)
        .then(res => res.json())
        .then((data: unknown) => {
          const typedData = data as string[] // 型アサーション

          if (isCancelled) {
            loadedData[dataName] = typedData
          } else {
            dispatch({ type: 'setFetchingData', data: false })
            dispatch({ type: 'setData', data: typedData, dataName })
          }
        })
    }

    return () => {
      isCancelled = true
    }
  }, [dispatch, dataName])
}

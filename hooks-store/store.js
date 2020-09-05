import { useEffect, useState } from 'react'

let state = {}
let listeners = []
let actions = {}

export const useStore = (shouldListen = true) => {
  const [_, setState] = useState(state)

  useEffect(() => {
    shouldListen && listeners.push(setState)
    return () =>
      shouldListen && (listeners = listeners.filter(li => li !== setState))
  }, [shouldListen])

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](state, payload)
    state = {
      ...state,
      ...newState,
    }
    for (const listener of listeners) {
      listener(state)
    }
  }

  return [state, dispatch]
}

export const initStore = (userActions, initialState) => {
  if (initialState) {
    state = { ...state, ...initialState }
  }
  actions = { ...actions, ...userActions }
}

export const initializeStore = stores => stores.forEach(s => s())

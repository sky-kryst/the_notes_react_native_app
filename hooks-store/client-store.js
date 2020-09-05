import { initStore } from './store'

const configureStore = () => {
  const actions = {
    SET_CLIENT: (_, val) => ({ client: val }),
    REMOVE_CLIENT: () => ({ client: null }),
  }

  initStore(actions, { client: null })
}

export default configureStore

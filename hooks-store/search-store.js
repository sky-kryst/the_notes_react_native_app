import { initStore } from './store'

const search = { status: false, value: '', history: [] }

const configureStore = () => {
  const actions = {
    SET_SEARCH_STATUS: ({ search }, status = true) => ({
      search: {
        ...search,
        status,
      },
    }),
    SET_SEARCH_VALUE: ({ search }, value) => ({
      search: { ...search, value },
    }),
    SET_SEARCH_HISTORY: ({ search }, value) => ({
      search: {
        ...search,
        history: [...search.history, ...value],
      },
    }),
    SET_SEARCH: (_, val) => ({ search: val }),
    REMOVE_SEARCH_STATUS: ({ search }, value = false) => ({
      search: {
        ...search,
        value,
      },
    }),
    REMOVE_SEARCH_VALUE: ({ search }, value = '') => ({
      search: {
        ...search,
        value,
      },
    }),
    TOGGLE_SEARCH_STATUS: ({ search }) => ({
      search: {
        ...search,
        status: !search.status,
      },
    }),
  }

  initStore(actions, { search })
}

export default configureStore

import { initStore } from './store'
// import AsyncStorage from '@react-native-community/async-storage'

const details = { token: null, userId: null, expiresOn: null }

const configureStore = () => {
  const actions = {
    SET_TOKEN: ({ details }, token) => ({ details: { ...details, token } }),
    SET_USER_ID: ({ details }, userId) => ({ details: { ...details, userId } }),
    SET_EXPIRES_ON: ({ details }, expiresOn) => ({
      details: { ...details, expiresOn },
    }),
    SET_DETAILS: ({ details }, val) => ({ details: { ...details, ...val } }),
    REMOVE_DETAILS: () => ({ details }),
  }

  initStore(actions, { details })
}

export default configureStore

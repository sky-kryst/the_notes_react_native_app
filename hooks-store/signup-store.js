import { initStore } from './store'

const signup = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
}

const configureStore = () => {
  const actions = {
    SET_FIRSTNAME: ({ signup }, firstName) => {
      const New = {
        signup: { ...signup, firstName },
      }
      console.log('fn:', firstName)
      console.log('New:', New)
      return New
    },
    SET_LASTNAME: ({ signup }, lastName) => ({
      signup: { ...signup, lastName },
    }),
    SET_USERNAME: ({ signup }, username) => ({
      signup: { ...signup, username },
    }),
    SET_EMAIL: ({ signup }, email) => ({ signup: { ...signup, email } }),
    SET_PASSWORD: ({ signup }, password) => ({
      signup: { ...signup, password },
    }),
    SET_PASSWORD_CONFIRM: ({ signup }, passwordConfirm) => ({
      signup: {
        ...signup,
        passwordConfirm,
      },
    }),
    SET_SIGNUP: ({ signup }, val) => ({ signup: { ...signup, ...val } }),
    REMOVE_SIGNUP: () => ({ signup }),
  }
  initStore(actions, { signup })
}

export default configureStore

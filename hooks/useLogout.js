import { useMutation } from '@apollo/react-hooks'
import AsyncStorage from '@react-native-community/async-storage'
import gql from 'graphql-tag'
import { Alert } from 'react-native'
import { useStore } from '../hooks-store/store'

const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser {
      token
    }
  }
`

const useLogout = (navigation, atHome = false) => {
  const dispatch = useStore(false)[1]

  const [logout] = useMutation(LOGOUT_USER, {
    onCompleted: () =>
      (async () => {
        await AsyncStorage.multiRemove(['token', 'userId', 'expiresOn'])
        dispatch('REMOVE_CLIENT')
        dispatch('REMOVE_DETAILS')
        if (atHome) {
          Alert.alert(
            'Login Expired',
            "You've been logged out. Do you want to login to access your data?",
            [
              {
                text: 'LogIn',
                onPress: () => navigation.navigate('Login'),
              },
              {
                text: 'OK',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            { cancelable: true }
          )
        }
      })(),
  })

  return logout
}

export default useLogout

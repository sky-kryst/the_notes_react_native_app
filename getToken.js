import AsyncStorage from '@react-native-community/async-storage'

let token

const getToken = async () => {
  token = (await AsyncStorage.getItem('token')) || null
  return token
}

export default getToken()

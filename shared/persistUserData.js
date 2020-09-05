import AsyncStorage from '@react-native-community/async-storage'
export default async (data, { dispatch, client, navigation }) => {
  const { user, token, expiresOn } = data
  await AsyncStorage.multiSet([
    ['token', token],
    ['userId', user.id],
    ['expiriesOn', expiresOn],
  ])
  client.clearStore()
  dispatch('REMOVE_CLIENT')
  dispatch('SET_DETAILS', { token, expiresOn, userId: user.id })
}

import React, { useEffect } from 'react'
import Feed from '../../UI/Feed/Feed'
import GET_NOTES from './Home.graphql'
import * as Notifications from 'expo-notifications'
import { useStore } from '../../../hooks-store/store'
import useLogout from '../../../hooks/useLogout'

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
    }
  },
})

const Home = ({ navigation }) => {
  const { expiresOn } = useStore()[0].details
  const logout = useLogout(navigation.navigate, true)
  const onNotificationAccessed = () => navigation.navigate('Requests')

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      onNotificationAccessed
    )
    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      onNotificationAccessed
    )

    return () => {
      backgroundSubscription.remove()
      foregroundSubscription.remove()
    }
  }, [])

  useEffect(() => {
    const T = setTimeout(
      () => expiresOn && logout(),
      Date.parse(expiresOn) - Date.now()
    )
    return () => clearTimeout(T)
  }, [expiresOn])

  return <Feed query={GET_NOTES} />
}

export default Home

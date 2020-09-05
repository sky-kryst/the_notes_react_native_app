import { useMutation } from '@apollo/react-hooks'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import styles from './App.style'
import MainNavigator from './containers/navigations/notesNavigator'
import useRequests from './hooks/useRequests'

const GET_MY_SENT_REQUESTS = gql`
  query MySentRequests(
    $query: String
    $first: Int
    $skip: Int
    $orderBy: RequestOrderByInput
  ) {
    mySentRequests(
      query: $query
      first: $first
      skip: $skip
      orderBy: $orderBy
    ) {
      id
      accepted
      type
      note {
        title
        creator {
          firstName
          lastName
        }
      }
    }
  }
`
const GET_MY_RECEIVED_REQUESTS = gql`
  query MyReceivedRequests(
    $query: String
    $first: Int
    $skip: Int
    $orderBy: RequestOrderByInput
  ) {
    myReceivedRequests(
      query: $query
      first: $first
      skip: $skip
      orderBy: $orderBy
    ) {
      id
      accepted
      type
      note {
        title
      }
      user {
        firstName
        lastName
      }
    }
  }
`

const SENT_REQUESTS_SUBSCRIPTION = gql`
  subscription SentRequests {
    sentRequests {
      node {
        id
        accepted
        type
        note {
          title
          creator {
            firstName
            lastName
          }
        }
      }
    }
  }
`
const RECEIVED_REQUESTS_SUBSCRIPTION = gql`
  subscription ReceivedRequests {
    receivedRequests {
      node {
        id
        accepted
        type
        note {
          title
        }
        user {
          firstName
          lastName
        }
      }
    }
  }
`

const SET_NOTIFICATION_TOKEN = gql`
  mutation SetNotificationToken($notificationToken: String!) {
    setNotificationToken(notificationToken: $notificationToken) {
      notificationToken
    }
  }
`

const SubApp = ({ token }) => {
  const [setNotificationToken] = useMutation(SET_NOTIFICATION_TOKEN)

  useRequests(GET_MY_SENT_REQUESTS, SENT_REQUESTS_SUBSCRIPTION, token)

  useRequests(GET_MY_RECEIVED_REQUESTS, RECEIVED_REQUESTS_SUBSCRIPTION, token)

  useEffect(() => {
    const effect = async () => {
      try {
        let status = await Permissions.getAsync(Permissions.NOTIFICATIONS)
          .status
        if (status !== 'granted') {
          status = (await Permissions.askAsync(Permissions.NOTIFICATIONS))
            .status
          if (status === 'granted') {
            const pushToken = (await Notifications.getExpoPushTokenAsync()).data
            setNotificationToken({
              variables: { notificationToken: pushToken },
            })
          } else {
            throw Error('Permission not granted!')
          }
        }
      } catch {
        return null
      }
    }
    token && effect()
  }, [token])

  return (
    <SafeAreaView style={styles.container}>
      <MainNavigator />
    </SafeAreaView>
  )
}

export default SubApp

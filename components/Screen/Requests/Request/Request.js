import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useContext, useState } from 'react'
import { Text, View, ToastAndroid } from 'react-native'
import { Button } from 'react-native-elements'
import { RequestsContext } from '../../../../Context/Requests'
import styles from './request.style'
import {
  sendNotification,
  assignTitle,
} from '../../../../shared/sendNotification'
import { withNavigation } from 'react-navigation'

const RESPOND_REQUEST = gql`
  mutation RespondRequest($data: respondInputs!) {
    respondRequest(data: $data) {
      note {
        creator {
          firstName
          lastName
        }
      }
      accepted
      type
      user {
        notificationToken
      }
    }
  }
`

const Request = ({ id, accepted, type, title, creator, user, navigation }) => {
  const { setRequests } = useContext(RequestsContext)

  const [reacted, setReacted] = useState(false)

  const [respondRequest] = useMutation(RESPOND_REQUEST, {
    onError: err => {
      setReacted(false)
      ToastAndroid.showWithGravity(
        err.message.split(':')[1],
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
    },
    onCompleted: ({ respondRequest }) => {
      setRequests(pS => pS.filter(l => id !== l.id))
      const {
        note: {
          creator: { firstName, lastName },
        },
        type,
        accepted,
        user: { notificationToken },
      } = respondRequest
      accepted &&
        sendNotification(
          notificationToken,
          `Request Accepted!`,
          `${firstName} ${lastName} has accepted your request to ${type.toLowerCase()} '${assignTitle(
            title
          )}'`
        )
    },
  })

  if (reacted) return null

  if (accepted) {
    return (
      <View style={styles.Request}>
        <Text style={styles.Text}>
          Your request to {type.toLowerCase()}{' '}
          <Text style={{ fontWeight: 'bold' }}>
            {title.length > 15 ? `${title.slice(0, 14)}...` : title}
          </Text>{' '}
          has been accepted by{' '}
          <Text
            style={{ fontWeight: 'bold' }}
          >{`${creator.firstName} ${creator.lastName}`}</Text>
        </Text>
        <View style={{ ...styles.Buttons, justifyContent: 'center' }}>
          <Button
            title="OK"
            onPress={() => {
              setReacted(true)
              respondRequest({ variables: { data: { id } } })
            }}
            buttonStyle={styles.Button}
            type="outline"
            containerStyle={{ width: '30%' }}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.Request}>
      <Text style={styles.Text}>
        <Text
          style={{ fontWeight: 'bold' }}
        >{`${user.firstName} ${user.lastName}`}</Text>{' '}
        has requested to {type.toLowerCase()}{' '}
        <Text style={{ fontWeight: 'bold' }}>
          {title.length > 15 ? `${title.slice(0, 14)}...` : title}
        </Text>
      </Text>
      <View style={styles.Buttons}>
        <Button
          title="Accept"
          onPress={() => {
            setReacted(true)
            respondRequest({ variables: { data: { id, response: true } } })
          }}
          buttonStyle={styles.Button}
          type="outline"
          containerStyle={{ width: '40%' }}
        />
        <Button
          title="Decline"
          onPress={() => {
            setReacted(true)
            respondRequest({ variables: { data: { id } } })
          }}
          buttonStyle={styles.Button}
          type="outline"
          containerStyle={{ width: '40%' }}
        />
      </View>
    </View>
  )
}

export default withNavigation(Request)

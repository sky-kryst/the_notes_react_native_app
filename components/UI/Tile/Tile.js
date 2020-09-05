import { useMutation, useSubscription } from '@apollo/react-hooks'
import { Ionicons } from '@expo/vector-icons'
import gql from 'graphql-tag'
import React, { useCallback, useReducer } from 'react'
import { Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import IDPresent from '../../../shared/noDuplicateIDs'
import styles from './Tile.styles'
import {
  sendNotification,
  assignTitle,
  assignBody,
} from '../../../shared/sendNotification'

const SEND_REQUEST = gql`
  mutation SendRequest($data: requestInputs!) {
    sendRequest(data: $data) {
      type
      user {
        firstName
        lastName
      }
    }
  }
`

const TOGGLE_LIKE = gql`
  mutation ToggleLikes($id: ID!) {
    toggleLikes(id: $id) {
      id
    }
  }
`

const SUBSCRIBE_TILE = gql`
  subscription Note($id: ID!) {
    note(id: $id) {
      node {
        title
        body
        likes {
          id
        }
        collaborator {
          id
        }
        consumer {
          id
        }
        published
      }
    }
  }
`

const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $note: Note!) {
    updateNote(id: $id, note: $note) @client
  }
`

const reducer = (Tile, action) => {
  switch (action.type) {
    case 'LIKE':
      return { ...Tile, Liked: !Tile.Liked, Likes: Tile.Likes + 1 }
    case 'DISLIKE':
      return { ...Tile, Liked: !Tile.Liked, Likes: Tile.Likes - 1 }
    case 'UPDATE':
      return { ...Tile, ...action.Tile }
    default:
      return Tile
  }
}

const shortify = quantity =>
  quantity > 1000
    ? quantity > 1000000
      ? quantity > 1000000000
        ? `${Math.floor(quantity / 1000)}B+`
        : `${Math.floor(quantity / 1000)}M+`
      : `${Math.floor(quantity / 1000)}k+`
    : quantity > 0
    ? quantity
    : null

const { height } = Dimensions.get('screen')

const Tile = ({
  id,
  title,
  body,
  navigation,
  creator,
  collaborator = [],
  consumer = [],
  likes,
  token,
  userId,
}) => {
  const [{ Likes, Liked, Published }, dispatch] = useReducer(reducer, {
    Likes: likes.length,
    Liked: IDPresent(userId, likes),
    Published: true,
  })

  const [updateNote] = useMutation(UPDATE_NOTE)

  useSubscription(SUBSCRIBE_TILE, {
    shouldResubscribe: true,
    variables: { id },
    onSubscriptionData: ({
      subscriptionData: {
        data: {
          note: {
            node: { title, body, likes, collaborator, consumer, published },
          },
        },
      },
    }) => {
      if (creator.id !== userId) {
        updateNote({
          variables: {
            id,
            note: { title, body, creator, collaborator, consumer, likes },
          },
        })
        dispatch({
          type: 'UPDATE',
          Tile: {
            Likes: likes.length,
            Liked: IDPresent(userId, likes),
            Published: published,
          },
        })
      }
    },
  })

  const updateLikes = useCallback(() => {
    if (Liked) return dispatch({ type: 'DISLIKE' })
    return dispatch({ type: 'LIKE' })
  }, [Liked])

  const [sendRequest] = useMutation(SEND_REQUEST, {
    onCompleted: ({ sendRequest }) => {
      const {
        type,
        user: { firstName, lastName },
      } = sendRequest
      sendNotification(
        creator.notificationToken,
        `New  ${type.toLowerCase()} request!`,
        `${firstName} ${lastName} has sent a request to ${type.toLowerCase()} '${assignTitle(
          title
        )}'`
      )
    },
  })

  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    onError: err => {
      updateLikes()
      return Alert.alert(
        'Error!',
        err.message.split(':')[1],
        [
          {
            text: 'Try Again',
            onPress: () => {},
          },
          { text: 'OK', onPress: () => navigation.goBack(), style: 'cancel' },
        ],
        { cancelable: true }
      )
    },
  })

  const shouldNavigate = to => {
    if (!token) {
      return Alert.alert(
        'Not logged in',
        'You need to login to get access to notes',
        [
          {
            text: 'Ok',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
          { text: 'Login', onPress: () => navigation.navigate('Login') },
        ],
        { cancelable: false }
      )
    }
    const type = to.startsWith('R') ? 'VIEW' : 'EDIT'
    if (
      userId !== creator.id &&
      !(IDPresent(userId, collaborator) && type === 'EDIT') &&
      !(IDPresent(userId, consumer) && type === 'VIEW')
    ) {
      return Alert.alert(
        'Not Authorized',
        `You don't have permission to ${type.toLowerCase()} this note. Try sending a request to the author!`,
        [
          {
            text: 'Send',
            onPress: () =>
              sendRequest({
                variables: {
                  data: {
                    noteId: id,
                    type,
                  },
                },
              }),
          },
          {
            text: 'Cancel',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      )
    }
    return navigation.navigate(to, { id, title, body })
  }

  if (!Published) return null

  return (
    <TouchableOpacity
      style={styles.Tile}
      activeOpacity={0.8}
      onPress={() => shouldNavigate('ReadScreen')}
    >
      <View style={styles.Title}>
        <Text style={styles.titleText}>{assignTitle(title)}</Text>
      </View>
      <View style={styles.Body}>
        <Text style={styles.bodyText}>{assignBody(body)}</Text>
      </View>
      <View style={styles.Buttons}>
        <TouchableOpacity
          onPress={() => {
            updateLikes()
            toggleLike({ variables: { id } })
          }}
          style={styles.Button}
        >
          <Text style={{ paddingRight: '5%' }}>{shortify(Likes)}</Text>
          <Ionicons
            title="Like"
            name={Liked ? 'ios-heart' : 'ios-heart-empty'}
            size={10 + Math.floor(height / 100)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => shouldNavigate('ReadScreen')}
          style={styles.Button}
        >
          <Text style={{ paddingRight: '5%' }}>
            {shortify(consumer.length)}
          </Text>
          <Ionicons
            title="View"
            name="ios-eye"
            size={10 + Math.floor(height / 100)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => shouldNavigate('CreateScreen')}
          style={styles.Button}
        >
          <Text style={{ paddingRight: '5%' }}>
            {shortify(collaborator.length)}
          </Text>
          <Ionicons
            title="Edit"
            name="ios-quote"
            size={10 + Math.floor(height / 100)}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default withNavigation(Tile)

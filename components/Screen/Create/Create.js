import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native'
import styles from './Create.style'
import { Button } from 'react-native-elements'
import { useStore } from '../../../hooks-store/store'

const CREATE_NOTE = gql`
  mutation CreateNote($data: createNoteInput!) {
    createNote(data: $data) {
      id
      title
      body
      creator {
        id
      }
      collaborator {
        id
      }
      consumer {
        id
      }
      likes {
        id
      }
    }
  }
`
const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $data: updateNoteInput!) {
    updateNote(id: $id, data: $data) {
      id
      title
      body
      creator {
        id
      }
      collaborator {
        id
      }
      consumer {
        id
      }
      likes {
        id
      }
    }
  }
`
const UPDATE_NOTE_CACHE = gql`
  mutation UpdateNote($id: ID!, $note: Note!) {
    updateNote(id: $id, note: $note) @client
  }
`
const CREATE_NOTE_CACHE = gql`
  mutation CreateNote($id: ID!, $note: Note!) {
    createNote(id: $id, note: $note) @client
  }
`

const Create = ({ navigation }) => {
  const [title, setTitle] = useState(navigation.getParam('title', ''))
  const [body, setBody] = useState(navigation.getParam('body', ''))

  const { token } = useStore()[0].details

  const sendNote = () => {
    if (!token) {
      return Alert.alert(
        'Not logged in',
        'You need to login to publish this note',
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
    if (navigation.getParam('id', null)) {
      return updateNote()
    } else {
      return Alert.alert(
        'Publish?',
        'Are you sure you want to publish note?',
        [
          {
            text: 'Save as draft',
            onPress: () =>
              createNote({
                variables: { data: { title, body, published: false } },
              }),
          },
          {
            text: 'Publish',
            onPress: () => {
              console.log({ title, body })
              createNote({
                variables: { data: { title, body, published: true } },
              })
            },
          },
        ],
        { cancelable: false }
      )
    }
  }

  const [createNoteCache] = useMutation(CREATE_NOTE_CACHE, {
    onCompleted: () => navigation.goBack(),
  })

  const [updateNoteCache] = useMutation(UPDATE_NOTE_CACHE, {
    onCompleted: () => {
      navigation.setParams({ id: null, title: null, body: null })
      navigation.goBack()
    },
  })

  const [createNote, { loading: creating }] = useMutation(CREATE_NOTE, {
    onCompleted: ({
      createNote: { id, title, body, creator, collaborator, consumer, likes },
    }) =>
      createNoteCache({
        variables: {
          id,
          note: { title, body, creator, collaborator, consumer, likes },
        },
      }),
    onError: err => {
      console.log(err)
      Alert.alert(
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

  const [updateNote, { loading: updating }] = useMutation(UPDATE_NOTE, {
    variables: { id: navigation.getParam('id', null), data: { title, body } },
    onCompleted: ({
      updateNote: { id, title, body, creator, collaborator, consumer, likes },
    }) =>
      updateNoteCache({
        variables: {
          id,
          note: { title, body, creator, collaborator, consumer, likes },
        },
      }),
    onError: err =>
      Alert.alert(
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
      ),
  })

  if (creating || updating) {
    return (
      <View style={styles.Home}>
        <ActivityIndicator size="large" color="#D0D0D0" />
      </View>
    )
  }

  return (
    <View style={styles.Create}>
      <KeyboardAvoidingView style={{ flex: 1 }} behaviour="position">
        <TextInput
          defaultValue={title}
          style={styles.title}
          placeholder="Title( Max 70 characters)"
          onChangeText={e => setTitle(e)}
          multiline={true}
          allowFontScaling={false}
          maxLength={70}
        />
        <TextInput
          defaultValue={body}
          style={styles.body}
          placeholder="Write your note here...( Max 1500 characters)"
          onChangeText={e => setBody(e)}
          multiline={true}
          maxLength={1500}
        />
      </KeyboardAvoidingView>
      <View style={styles.navigate}>
        <Button
          title="Clear"
          type="clear"
          onPress={() => {
            setTitle('')
            setBody('')
            navigation.goBack()
          }}
          containerStyle={{ width: '30%' }}
          buttonStyle={{ borderWidth: 1 }}
        />
        <Button
          title="Post"
          type="clear"
          onPress={() => sendNote()}
          containerStyle={{ width: '30%' }}
          buttonStyle={{ borderWidth: 1 }}
        />
      </View>
    </View>
  )
}

export default Create

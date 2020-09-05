import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native'
import { Avatar, Button, Overlay, Input } from 'react-native-elements'
import { useStore } from '../../../hooks-store/store'
import styles from './User.style'
import gql from 'graphql-tag'
import useLogout from '../../../hooks/useLogout'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import Display from './Display'
import image from '../../../assets/add-header.png'

const GET_ME = gql`
  {
    me {
      firstName
      lastName
      username
      email
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUser($data: updateUserInput!, $password: String!) {
    updateUser(data: $data, password: $password) {
      id
    }
  }
`

const User = ({ navigation }) => {
  const { token } = useStore()[0].details

  const [visible, setVisible] = useState(false)

  const [value, setValue] = useState([])

  const [updatedValue, setUpdatedValue] = useState(null)

  const [onChange, setOnChange] = useState(false)

  const [password, setPassword] = useState(null)

  const [confirmValue, setConfirmValue] = useState(null)

  const logout = useLogout(navigation)

  const onSubmissionFinish = () => {
    setOnChange(false)
    setUpdatedValue(null)
    setValue([])
    setConfirmValue(false)
    setPassword(null)
    setVisible(false)
    return refetch()
  }

  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER, {
    onCompleted: onSubmissionFinish,
  })

  const label = e => {
    switch (e) {
      case 'firstName':
        return 'First Name:'
      case 'lastName':
        return 'Last Name:'
      case 'username':
        return 'Username:'
      case 'email':
        return 'Email:'
      case 'password':
        return 'Password:'
      default:
        return null
    }
  }

  const [getMe, { loading, data, refetch }] = useLazyQuery(GET_ME, {
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

  useEffect(() => {
    if (token) getMe()
  }, [token])

  if (token) {
    if (loading || updating) {
      return (
        <View style={styles.Home}>
          <ActivityIndicator size="large" color="#D0D0D0" />
        </View>
      )
    }

    if (data) {
      const { me } = data
      return (
        <SafeAreaView style={styles.User}>
          <Overlay isVisible={visible} onBackdropPress={onSubmissionFinish}>
            {onChange && updatedValue ? (
              <View style={styles.Overlay}>
                <Text style={styles.OverlayText}>Password:</Text>
                <Input onChangeText={t => setPassword(t)} />
                <Button
                  title="Submit"
                  onPress={() =>
                    updateUser({
                      variables: {
                        data: { [value[0]]: updatedValue },
                        password,
                      },
                    })
                  }
                />
              </View>
            ) : value[0] === 'password' ? (
              <View style={styles.Overlay}>
                <Text style={styles.OverlayText}>New {label(value[0])}</Text>
                <Input
                  onChangeText={t => setUpdatedValue(t)}
                  errorMessage={
                    onChange && !updatedValue ? 'Field cannot be empty' : null
                  }
                />
                <Text style={styles.OverlayText}>
                  Confirm {label(value[0])}
                </Text>
                <Input
                  onChangeText={t => setConfirmValue(t)}
                  errorMessage={
                    onChange && !confirmValue
                      ? 'Confirm field cannot be empty'
                      : onChange && updatedValue !== confirmValue
                      ? 'Passwords Should match'
                      : null
                  }
                />
                <Button title="Continue" onPress={() => setOnChange(true)} />
              </View>
            ) : (
              <View style={styles.Overlay}>
                <Text style={styles.OverlayText}>{label(value[0])}</Text>
                <Text
                  style={{
                    ...styles.OverlayText,
                    fontWeight: '900',
                    paddingLeft: '5%',
                  }}
                >
                  {value[1]}
                </Text>
                <Text style={styles.OverlayText}>New {label(value[0])}:</Text>
                <Input
                  onChangeText={t => setUpdatedValue(t)}
                  errorMessage={
                    onChange && !updatedValue
                      ? 'New field cannot be empty'
                      : null
                  }
                />
                <Button title="Continue" onPress={() => setOnChange(true)} />
              </View>
            )}
          </Overlay>
          <ImageBackground
            style={styles.header}
            source={image}
            imageStyle={styles.HeaderImage}
          >
            <Avatar
              rounded
              size="xlarge"
              icon={{ name: 'account-circle' }}
              containerStyle={styles.Avatar}
            />
          </ImageBackground>
          <View style={styles.content}>
            <Display
              values={me}
              setOverlay={setVisible}
              changeContext={setValue}
              label={label}
            />
            <Button
              title="Logout"
              onPress={() => logout()}
              containerStyle={{ width: '40%', alignSelf: 'center' }}
            />
          </View>
        </SafeAreaView>
      )
    }
  }

  return (
    <View style={styles.Home}>
      <Text style={{ alignSelf: 'center' }}>
        You must login to view this page.
      </Text>
    </View>
  )
}

export default User

import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import gql from 'graphql-tag'
import React from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
  View,
} from 'react-native'
import * as Yup from 'yup'
import { useStore } from '../../../hooks-store/store'
import useSignup from '../../../hooks/useSignup'
import persistUserData from '../../../shared/persistUserData'
import styles from './Signup.style'
import { Button, Input } from 'react-native-elements'

const CREATE_USER = gql`
  mutation CreateUser($data: createUserInput!) {
    createUser(data: $data) {
      user {
        id
      }
      token
      expiresOn
    }
  }
`

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password should be minimum 8 characters')
    .max(15, 'Password should be not more than 15 characters')
    .required('Password is empty'),
  passwordConfirm: Yup.string().required('Confirm field is empty'),
})

const SignUp = ({ navigation }) => {
  const [{ signup }, dispatch] = useStore()
  useSignup(dispatch)

  const [createUser, { loading, client }] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      dispatch('REMOVE_SIGNUP')
      persistUserData(createUser, { dispatch, client })
    },
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

  if (loading)
    return (
      <View style={styles.Home}>
        <ActivityIndicator size="large" color="#D0D0D0" />
      </View>
    )

  return (
    <Formik
      initialValues={{
        password: signup.password,
        passwordConfirm: signup.passwordConfirm,
      }}
      onSubmit={val =>
        createUser({ variables: { data: { ...signup, ...val } } })
      }
      validationSchema={validationSchema}
    >
      {({
        handleBlur,
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
      }) => {
        const { password, passwordConfirm } = values
        return (
          <KeyboardAvoidingView behaviour="position" style={styles.Signup}>
            <Input
              inputStyle={styles.Input}
              value={password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="Password"
              autoCapitalize="none"
              errorMessage={touched.password && errors.password}
              errorStyle={styles.Error}
            />
            <Input
              inputStyle={styles.Input}
              value={passwordConfirm}
              onChangeText={handleChange('passwordConfirm')}
              onBlur={handleBlur('passwordConfirm')}
              placeholder="Confirm Password"
              autoCapitalize="none"
              errorMessage={touched.passwordConfirm && errors.passwordConfirm}
              errorStyle={styles.Error}
            />
            <View style={styles.Buttons}>
              <Button
                onPress={() => {
                  dispatch('SET_SIGNUP', { password, passwordConfirm })
                  navigation.goBack()
                }}
                title="Back"
                containerStyle={styles.Button}
              />
              <Button
                onPress={handleSubmit}
                title="Submit"
                containerStyle={styles.Button}
              />
            </View>
          </KeyboardAvoidingView>
        )
      }}
    </Formik>
  )
}

export default SignUp

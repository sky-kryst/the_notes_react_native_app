import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import gql from 'graphql-tag'
import React from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  ToastAndroid,
} from 'react-native'
import { Input, Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import * as Yup from 'yup'
import { useStore } from '../../../hooks-store/store'
import persistUserData from '../../../shared/persistUserData'
import styles from './Login.style'
import { Ionicons } from '@expo/vector-icons'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is empty'),
  password: Yup.string().required('Password is empty'),
})

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
      }
      token
      expiresOn
    }
  }
`

const initialValues = {
  email: '',
  password: '',
}

const Login = ({ navigation }) => {
  const dispatch = useStore(false)[1]

  const [loginUser, { loading, client }] = useMutation(LOGIN_USER, {
    onCompleted: ({ loginUser }) =>
      persistUserData(loginUser, { dispatch, client }),
    onError: err =>
      ToastAndroid.showWithGravity(
        err.message.split(':')[1],
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      ),
  })

  if (loading)
    return (
      <View style={styles.Home}>
        <ActivityIndicator size="large" color="#D0D0D0" />
      </View>
    )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={val => loginUser({ variables: val })}
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
          const { email, password } = values
          return (
            <View style={styles.Login}>
              <KeyboardAvoidingView style={{ justifyContent: 'space-between' }}>
                <Input
                  value={email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Email"
                  containerStyle={styles.Input}
                  autoCapitalize="none"
                  inputStyle={styles.Text}
                  errorMessage={touched.email && errors.email}
                  label="Enter your Email"
                  leftIcon={
                    <Ionicons name="ios-mail" color="darkgrey" size={22} />
                  }
                  leftIconContainerStyle={styles.Icon}
                  labelStyle={styles.Label}
                />
                <Input
                  value={password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Password"
                  containerStyle={styles.Input}
                  autoCapitalize="none"
                  errorMessage={touched.password && errors.password}
                  label="Password"
                  inputStyle={styles.Text}
                  leftIcon={
                    <Ionicons name="ios-lock" color="darkgrey" size={22} />
                  }
                  leftIconContainerStyle={styles.Icon}
                  labelStyle={styles.Label}
                />
                <View style={styles.Button}>
                  <Button onPress={handleSubmit} title="Submit" />
                </View>
              </KeyboardAvoidingView>
              <View style={styles.Options}>
                <Text style={styles.OptionsText}>New here?</Text>
                <Button
                  title="Signup"
                  onPress={() => navigation.navigate('Signup')}
                />
              </View>
            </View>
          )
        }}
      </Formik>
    </SafeAreaView>
  )
}

export default withNavigation(Login)

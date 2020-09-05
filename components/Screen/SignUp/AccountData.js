import { Formik } from 'formik'
import React from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import * as Yup from 'yup'
import { useStore } from '../../../hooks-store/store'
import useSignup from '../../../hooks/useSignup'
import styles from './Signup.style'
import { Button, Input } from 'react-native-elements'

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username too short!')
    .max(15, 'Username too long!')
    .required('Username is empty'),
  email: Yup.string().email('Invalid email').required('Email is empty'),
})

const SignUp = ({ navigation }) => {
  const [{ signup }, dispatch] = useStore()
  useSignup(dispatch)
  return (
    <Formik
      initialValues={{
        username: signup.username,
        email: signup.email,
      }}
      onSubmit={val => {
        dispatch('SET_SIGNUP', val)
        navigation.navigate('Passwords')
      }}
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
        const { username, email } = values
        return (
          <KeyboardAvoidingView behaviour="position" style={styles.Signup}>
            <Input
              inputStyle={styles.Input}
              value={username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              placeholder="Username"
              autoCapitalize="none"
              errorMessage={touched.username && errors.username}
              errorStyle={styles.Error}
            />
            <Input
              inputStyle={styles.Input}
              value={email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Email"
              autoCapitalize="none"
              errorMessage={touched.email && errors.email}
              errorStyle={styles.Error}
            />
            <View style={styles.Buttons}>
              <Button
                onPress={() => navigation.goBack()}
                title="Back"
                containerStyle={styles.Button}
              />
              <Button
                onPress={handleSubmit}
                title="Next"
                style={styles.Button}
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

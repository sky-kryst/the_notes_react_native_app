import { Formik } from 'formik'
import React from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import * as Yup from 'yup'
import { useStore } from '../../../hooks-store/store'
import useSignup from '../../../hooks/useSignup'
import styles from './Signup.style'
import { Button, Input } from 'react-native-elements'

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Name too short!')
    .max(25, 'Name too long!')
    .required('First name is empty'),
  lastName: Yup.string()
    .min(2, 'Name too short!')
    .max(25, 'Name too long!')
    .required('Last name is empty'),
})

const SignUp = ({ navigation }) => {
  const [{ signup }, dispatch] = useStore()
  useSignup(dispatch)
  return (
    <Formik
      initialValues={{
        firstName: signup.firstName,
        lastName: signup.lastName,
      }}
      onSubmit={val => {
        dispatch('SET_SIGNUP', val)
        navigation.navigate('AccountData')
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
        const { firstName, lastName } = values
        return (
          <KeyboardAvoidingView behaviour="position" style={styles.Signup}>
            <Input
              inputStyle={styles.Input}
              value={firstName}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              placeholder="First Name"
              errorMessage={touched.firstName && errors.firstName}
              errorStyle={styles.Error}
            />
            <Input
              inputStyle={styles.Input}
              value={lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              placeholder="Last Name"
              errorMessage={touched.lastName && errors.lastName}
              errorStyle={styles.Error}
            />
            <View style={{ ...styles.Buttons, justifyContent: 'space-evenly' }}>
              <Button
                onPress={handleSubmit}
                title="Next"
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

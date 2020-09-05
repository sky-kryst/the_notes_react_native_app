import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

const AddButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 40,
        right: 30,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 100,
      }}
      onPress={() => navigation.navigate('CreateScreen')}
    >
      <Ionicons name="ios-add" size={46} color="black" />
    </TouchableOpacity>
  )
}

export default withNavigation(AddButton)

import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import styles from './User.style'
import { Foundation } from '@expo/vector-icons'

const DisplayInfo = ({ values, setOverlay, changeContext, label }) => {
  const onClickChange = e => {
    changeContext(e)
    setOverlay(true)
  }

  return Object.entries(values)
    .concat([['password', '*******']])
    .filter(e => e[1] !== 'User')
    .map(e => (
      <View key={e[0]} style={styles.Display}>
        <Text style={styles.DisplayText}>{label(e[0])}</Text>
        <View style={styles.Values}>
          <Text style={styles.DisplayText}>{e[1]}</Text>
          <Button
            title="Change"
            type="outline"
            icon={<Foundation name="pencil" color="lightblue" />}
            iconRight={true}
            buttonStyle={styles.DisplayButton}
            titleStyle={{ fontSize: 10, marginBottom: '2%' }}
            onPress={() => onClickChange(e)}
          />
        </View>
      </View>
    ))
}

export default DisplayInfo

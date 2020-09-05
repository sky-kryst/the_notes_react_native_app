import React from 'react'
import { Picker, View } from 'react-native'

const Dropdown = ({ type, setType, onTypeChange }) => (
  <View
    style={{
      alignSelf: 'center',
      width: '56%',
    }}
  >
    <Picker
      selectedValue={type}
      style={{ height: 25, width: 150, alignSelf: 'flex-start' }}
      onValueChange={val => {
        setType(val)
        onTypeChange(val)
      }}
    >
      <Picker.Item label="Recent" value="recent" />
      <Picker.Item label="Most Liked" value="mostLiked" />
      <Picker.Item label="Most Viewed" value="mostViewed" />
      <Picker.Item label="Most Contributed" value="mostContributed" />
    </Picker>
  </View>
)

export default Dropdown

import React from 'react'
import { Dimensions, Text } from 'react-native'
import { useStore } from '../../../../hooks-store/store'

const { height } = Dimensions.get('screen')

const HeaderTitle = ({ shouldDisappear = true, style = {} }) => {
  const { status } = useStore()[0].search

  if (status && shouldDisappear) return null

  return (
    <Text
      style={{
        fontSize: height * 0.025,
        alignSelf: 'flex-start',
        fontFamily: 'serif',
        ...style,
      }}
    >
      The Notes App
    </Text>
  )
}

export default HeaderTitle

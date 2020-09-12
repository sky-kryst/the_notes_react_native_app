import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('screen')

const tens = Math.floor(height / 100)

const styles = StyleSheet.create({
  SearchBar: {
    width: width - width * (Math.floor(width / 100) === 3 ? 0.27 : 0.23),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 56,
  },
  overlay: { padding: 0, position: 'absolute', top: 0 },
})

export default styles

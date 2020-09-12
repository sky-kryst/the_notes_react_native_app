import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('screen')

const tens = Math.floor(height / 100)

const styles = StyleSheet.create({
  SearchBar: {
    width: width - width * (Math.floor(width / 100) === 3 ? 0.25 : 0.2),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginLeft: Math.floor(width / 100) - 1,
    backgroundColor: 'white',
    // height: `${tens < 8 ? tens + 3.25 : tens - 1.25}%`,
    height: 56,
  },
})

export default styles

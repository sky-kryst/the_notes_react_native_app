import { Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  SearchBar: {
    width: width - width * (Math.floor(width / 100) === 3 ? 0.25 : 0.2),
    alignSelf: 'flex-end',
    height: '100%',
    justifyContent: 'center',
    marginTop: 0,
    marginLeft: Math.floor(width / 100) - 1,
    backgroundColor: 'white',
  },
  SearchBarInput: {
    height: '106%',
  },
})

export default styles

import { Dimensions, StyleSheet } from 'react-native'

const { height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  Signup: {
    flex: 1,
    alignSelf: 'center',
    alignContent: 'space-around',
    justifyContent: 'flex-start',
    width: '70%',
    position: 'relative',
    top: '14%',
  },
  Input: {
    height: height * 0.075,
    marginTop: '3%',
    fontSize: 16,
    paddingLeft: 4,
  },
  Buttons: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Button: {
    width: '40%',
  },
  Error: {
    paddingLeft: '0.5%',
  },
})

export default styles

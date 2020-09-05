import { Dimensions, StyleSheet } from 'react-native'

const { height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  Login: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '84%',
    marginTop: '15%',
    height: '100%',
  },
  Input: {
    width: '80%',
    alignSelf: 'center',
    marginTop: '1%',
  },
  Label: {
    paddingLeft: '1%',
  },
  Icon: {
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  Button: {
    marginVertical: '9%',
  },
  Options: {
    height: Math.floor(height / 100) === 8 ? 200 : 160,
  },
  OptionsText: {
    fontSize: Math.floor(height / 100) * 2 + 4,
    padding: '2%',
  },
})

export default styles

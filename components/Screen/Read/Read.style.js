import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  Read: {
    flex: 1,
    overflow: 'scroll',
  },
  title: {
    paddingHorizontal: '3.5%',
    paddingVertical: '1%',
    fontSize: 36,
    fontFamily: 'serif',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: 'lightgrey',
    textAlign: 'left',
  },
  body: {
    paddingHorizontal: '4%',
    paddingVertical: '2%',
    textAlign: 'left',
    fontSize: 21,
    color: 'grey',
  },
})

export default styles

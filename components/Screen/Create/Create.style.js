import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  Create: {
    flex: 1,
    overflow: 'scroll',
  },
  title: {
    height: '11.5%',
    borderBottomColor: 'lightgrey',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 30,
    margin: 0,
    // textAlignVertical: 'top',
  },
  body: {
    height: '88.5%',
    fontSize: 21,
    textAlign: 'left',
    justifyContent: 'flex-start',
    paddingVertical: '1%',
    paddingHorizontal: '2%',
    overflow: 'scroll',
    borderBottomColor: 'lightgrey',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    overflow: 'scroll',
    margin: 0,
    textAlignVertical: 'top',
  },
  navigate: {
    // height: '8.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  button: {
    width: '28%',
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
})

export default styles

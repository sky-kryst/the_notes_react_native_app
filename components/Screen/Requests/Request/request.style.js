import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

const tens = Math.floor(height / 100)

const Tab = {
  /* height: height / (tens - 1),
  width: '100%', */
  borderBottomColor: 'lightgrey',
  borderBottomWidth: 1.5,
}

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    ...Tab,
    padding: '4%',
  },
  Request: {
    ...Tab,
    justifyContent: 'space-evenly',
    paddingHorizontal: '5%',
    alignContent: 'flex-start',
  },
  Text: {
    marginTop: '2.5%',
    fontSize: 10 + tens,
  },
  Buttons: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    paddingHorizontal: `${tens - 2}%`,
    marginTop: '2.8%',
    marginBottom: '3.5%',
  },
  Button: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: '#403F3C',
  },
  off: {
    display: 'none',
  },
})

export default styles

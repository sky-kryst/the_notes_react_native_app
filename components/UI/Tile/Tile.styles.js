import { Dimensions, StyleSheet } from 'react-native'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  Tile: {
    height: width * 0.472,
    width: width * 0.63,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginTop: '2%',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'lightgrey',
    overflow: 'hidden',
    /* shadowColor: 'lightgrey',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 2, */
  },
  Title: {
    height: '12%',
    width: '100%',
  },
  titleText: {
    fontSize: height / 49,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Body: {
    height: '74%',
    width: '100%',
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: 'lightgrey',
  },
  bodyText: {
    fontSize: height / 49,
  },
  Buttons: {
    height: '12%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
  },
  Button: {
    height: '100%',
    width: '33.33%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

// #D0D0D0

export default styles

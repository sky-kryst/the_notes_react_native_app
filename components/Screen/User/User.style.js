import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')

const tens = Math.floor(height / 100)
const wide = Math.floor(width / 100)

const styles = StyleSheet.create({
  User: {
    flex: 1,
    marginTop: '8.1%',
  },
  header: {
    backgroundColor: '#BFBCB7',
    flexDirection: 'row',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    height: tens * 20,
  },
  HeaderImage: {
    height: 60,
    width: 60,
    position: 'absolute',
    left: width / 2 - 30,
    top: tens * 10 - 30,
  },
  Avatar: {
    position: 'absolute',
    left: wide === 4 ? width - 135 : width - 130,
    top: tens == 8 ? tens * 4 : 0,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: '3%',
    paddingLeft: '3%',
  },
  Home: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  Values: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '1%',
  },
  Overlay: {
    height: height * 0.3,
    width: width * 0.65,
    justifyContent: 'space-evenly',
  },
  OverlayText: {
    fontSize: 20,
    paddingLeft: '3%',
    fontWeight: 'bold',
  },
  DisplayText: {
    fontSize: 17,
  },
  Display: {
    padding: 0,
  },
  DisplayButton: {
    height: '10%',
  },
  Title: {
    marginLeft: '5%',
    fontWeight: 'normal',
    fontSize: 20,
    width,
    fontFamily: 'sans-serif-medium',
  },
  TitleBar: { paddingTop: 0, height: `${tens === 8 ? 5 : 9}%` },
})

export default styles

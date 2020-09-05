import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableHighlight,
} from 'react-native'
// import { Button } from 'react-native-elements'
import { DrawerItems } from 'react-navigation-drawer'
import { useStore } from '../../../hooks-store/store'
import HeaderTitle from '../Header/HeaderTitle/HeaderTitle'
import useLogout from '../../../hooks/useLogout'

const { height } = Dimensions.get('screen')

const CustomDrawerContentComponent = props => {
  const { token } = useStore()[0].details
  const logout = useLogout(props.navigation)
  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <HeaderTitle
        shouldDisappear={false}
        style={{ marginTop: '6%', marginLeft: '13.5%', marginBottom: '2.5%' }}
      />
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      {token && (
        <TouchableHighlight
          onPress={() => {
            props.navigation.closeDrawer()
            logout()
          }}
          style={styles.Button}
        >
          <Text style={styles.Text}>Logout</Text>
        </TouchableHighlight>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '8.1%',
  },
  Button: {
    backgroundColor: '#403F3C',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: Math.floor(height / 100) * 6,
  },
  Text: {
    color: 'white',
    fontSize: Math.floor(height / 100) == 8 ? 22 : 16,
    fontWeight: '900',
  },
})

export default CustomDrawerContentComponent

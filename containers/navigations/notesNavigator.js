import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs'
import CreateScreen from '../../components/Screen/Create/Create'
import HomeScreen from '../../components/Screen/Home/Home'
import Login from '../../components/Screen/Login/Login'
import ReadScreen from '../../components/Screen/Read/Read'
import Requests from '../../components/Screen/Requests/Requests'
import AccountData from '../../components/Screen/SignUp/AccountData'
import Names from '../../components/Screen/SignUp/Names'
import Passwords from '../../components/Screen/SignUp/Passwords'
import Profile from '../../components/Screen/User/User'
import DrawerComponent from '../../components/UI/DrawerComponent/DrawerComponent'
import HeaderTitle from '../../components/UI/Header/HeaderTitle/HeaderTitle'
import LeftHeaderButtons from '../../components/UI/Header/LeftHeaderButton/lHB'
import RightHeaderButtons from '../../components/UI/Header/RightHeaderButtons/rHB'
import { myNotes, topNavigatorOptions } from './commonScreens'

const NotesScreenNavigator = createBottomTabNavigator(
  {
    ...myNotes,
  },
  {
    tabBarOptions: {
      inactiveBackgroundColor: '#989898',
      activeBackgroundColor: '#D0D0D0',
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      labelStyle: {
        fontSize: 15,
        marginBottom: 12,
        textTransform: 'uppercase',
      },
    },
  }
)

const TabsNavigator = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Notes: NotesScreenNavigator,
  },
  {
    ...topNavigatorOptions,
  }
)

const Feed = createStackNavigator({
  App: {
    screen: TabsNavigator,
    navigationOptions: ({ navigation }) => ({
      headerTitle: () => <HeaderTitle />,
      headerLeft: () => (
        <LeftHeaderButtons toggleDrawer={navigation.toggleDrawer} />
      ),
      headerRight: () => <RightHeaderButtons />,
    }),
  },
  ReadScreen: {
    screen: ReadScreen,
    navigationOptions: {
      title: 'Note',
    },
  },
  CreateScreen,
  Requests,
})

const SignupNavigator = createStackNavigator(
  {
    Names,
    AccountData,
    Passwords,
  },
  {
    headerMode: 'none',
  }
)

const AuthNavigator = createStackNavigator(
  {
    Login,
    Signup: {
      screen: SignupNavigator,
    },
  },
  {
    mode: 'modal',
    headerMode: 'screen',
  }
)

const MainApp = createDrawerNavigator(
  {
    Home: Feed,
    Profile,
    Login: AuthNavigator,
  },
  {
    drawerType: 'front',
    edgeWidth: 135,
    minSwipeDistance: 135,
    drawerWidth: '67.5%',
    contentOptions: {
      activeTintColor: '#989898',
    },
    contentComponent: DrawerComponent,
  }
)

export default createAppContainer(MainApp)

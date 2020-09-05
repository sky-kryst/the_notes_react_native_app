import CreatedNotes from '../../components/Screen/CreatedNotes/CreatedNotes'
import SharedNotes from '../../components/Screen/SharedNotes/SharedNotes'

export const myNotes = {
  createdNotesScreen: {
    screen: CreatedNotes,
    navigationOptions: {
      title: 'CREATED',
    },
  },
  sharedNotesScreen: {
    screen: SharedNotes,
    navigationOptions: {
      title: 'SHARED',
    },
  },
}

export const topNavigatorOptions = {
  navigationOptions: {
    swipeEnabled: true,
  },
  tabBarOptions: {
    style: {
      backgroundColor: '#989898',
    },
    indicatorStyle: {
      backgroundColor: '#505050',
      height: 3,
    },
  },
}

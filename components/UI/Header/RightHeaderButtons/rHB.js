import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useStore } from '../../../../hooks-store/store'
import HeaderButton from '../Header'
import NotificationButton from '../NotificationButton/NotificationButton'

const RightHeaderButtons = () => {
  const [{ search }, dispatch] = useStore()
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      {!search.status && (
        <Item
          title="Search"
          iconName="ios-search"
          onPress={() => dispatch('SET_SEARCH_STATUS')}
        />
      )}
      <NotificationButton />
    </HeaderButtons>
  )
}

export default RightHeaderButtons

import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useStore } from '../../../../hooks-store/store'
import HeaderButton from '../Header'
import styles from './lHB.style'

const LeftHeaderButtons = ({ toggleDrawer }) => {
  const [{ search }, dispatch] = useStore()

  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Menu" iconName="ios-menu" onPress={() => toggleDrawer()} />
      {search.status && (
        <SearchBar
          placeholder="Search"
          value={search.value}
          onChangeText={v => dispatch('SET_SEARCH_VALUE', v)}
          lightTheme={true}
          containerStyle={styles.SearchBar}
          inputContainerStyle={styles.SearchBarInput}
          clearIcon={
            <TouchableOpacity
              onPress={() =>
                dispatch('SET_SEARCH', {
                  searchStatus: false,
                  history: [...search.history, ...search.value],
                  value: '',
                })
              }
            >
              <Ionicons
                title="Edit"
                name="ios-close-circle"
                size={18}
                color="grey"
              />
            </TouchableOpacity>
          }
        />
      )}
    </HeaderButtons>
  )
}

export default LeftHeaderButtons

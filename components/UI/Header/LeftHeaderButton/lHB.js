import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, Modal } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useStore } from '../../../../hooks-store/store'
import HeaderButton from '../Header'
import styles from './lHB.style'

const LeftHeaderButtons = ({ toggleDrawer }) => {
  const dispatch = useStore(false)[1]
  const { value, status, history } = useStore()[0].search

  const clearInput = () =>
    dispatch('SET_SEARCH', {
      status: false,
      history: [...history, value],
      value: '',
    })

  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Menu" iconName="ios-menu" onPress={() => toggleDrawer()} />
      <Modal visible={status} transparent={true} onRequestClose={clearInput}>
        {status && (
          <SearchBar
            placeholder="Search"
            value={value}
            onChangeText={v => dispatch('SET_SEARCH_VALUE', v)}
            lightTheme={true}
            containerStyle={styles.SearchBar}
            inputContainerStyle={styles.SearchBarInput}
            clearIcon={
              <TouchableOpacity onPress={clearInput}>
                <Ionicons
                  title="Edit"
                  name="ios-close-circle"
                  size={18}
                  color="grey"
                />
              </TouchableOpacity>
            }
            onCancel={clearInput}
          />
        )}
      </Modal>
    </HeaderButtons>
  )
}

export default LeftHeaderButtons

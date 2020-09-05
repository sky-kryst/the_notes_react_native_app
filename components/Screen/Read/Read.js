import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { useStore } from '../../../hooks-store/store'
import styles from './Read.style'

const Read = ({ navigation }) => {
  const dispatch = useStore(false)[1]

  useEffect(() => {
    dispatch('REMOVE_SEARCH_VALUE')
    return () => navigation.setParams({ title: null, body: null })
  }, [])

  return (
    <View style={styles.Read}>
      <View>
        <Text style={styles.title}>{navigation.getParam('title', '...')}</Text>
      </View>
      <View>
        <Text style={styles.body}>{navigation.getParam('body', '...')}</Text>
      </View>
    </View>
  )
}

export default Read

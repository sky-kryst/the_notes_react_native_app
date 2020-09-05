import React, { useCallback, useContext, useEffect } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { RequestsContext } from '../../../Context/Requests'
import Request from './Request/Request'
import styles from './requests.style'

const Requests = () => {
  const { requests, setIsRequest } = useContext(RequestsContext)

  const wrappedSetIsRequest = useCallback(setIsRequest, [setIsRequest])

  useEffect(() => {
    wrappedSetIsRequest(false)
    return () => {
      if (requests.length > 0) wrappedSetIsRequest(true)
    }
  }, [requests, wrappedSetIsRequest])

  if (!requests) {
    return (
      <View style={styles.Home}>
        <ActivityIndicator size="large" color="#D0D0D0" />
      </View>
    )
  }

  if (requests.length === 0) {
    return (
      <View style={styles.Home}>
        <Text style={{ alignSelf: 'center' }}>Sorry! Nothing to see here.</Text>
      </View>
    )
  }

  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={requests}
        /* onRefresh={refresh}
        refreshing={refreshing} */
        renderItem={({ item }) => {
          if (item.accepted) {
            return (
              <Request
                title={item.note.title}
                creator={item.note.creator}
                accepted={item.accepted}
                type={item.type}
                id={item.id}
              />
            )
          }
          return (
            <Request
              title={item.note.title}
              user={item.user}
              accepted={item.accepted}
              type={item.type}
              id={item.id}
            />
          )
        }}
      />
    </View>
  )
}

export default Requests

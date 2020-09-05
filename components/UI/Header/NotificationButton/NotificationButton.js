import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Item } from 'react-navigation-header-buttons'
import { RequestsContext } from '../../../../Context/Requests'
import styles from './nB.style'

const NotificationButton = ({ navigation }) => {
  const { requests } = useContext(RequestsContext)
  const [NOOfRequests, setNOOfRequests] = useState(null)
  useEffect(() => {
    if (requests.length > 0) {
      setNOOfRequests(requests.length)
    } else {
      setNOOfRequests(null)
    }
  }, [requests])
  return (
    <View style={styles.nB}>
      <Item
        title="Requests"
        iconName="ios-notifications"
        onPress={() => navigation.navigate({ routeName: 'Requests' })}
      />
      {NOOfRequests && (
        <View style={styles.dot}>
          <Text style={styles.value}>{NOOfRequests}</Text>
        </View>
      )}
    </View>
  )
}
export default withNavigation(NotificationButton)

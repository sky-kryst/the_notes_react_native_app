import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import useFeed from '../../../hooks/useFeed'
import AddButton from '../AddButton/AddButton'
import Dropdown from '../Dropdown/Dropdown'
import Tiles from '../Tiles/Tiles'
import styles from './Feed.style'

const Feed = ({ query, check = null }) => {
  const {
    refreshing,
    fetching,
    type,
    setType,
    onRefresh,
    onUpdate,
    loading,
    data,
    token,
    userId,
    onTypeChange,
  } = useFeed(query, check)

  if (loading) {
    return (
      <View style={styles.Home}>
        <ActivityIndicator size="large" color="#D0D0D0" />
      </View>
    )
  }

  if (data) {
    return (
      <View style={styles.Home}>
        <Dropdown type={type} setType={setType} onTypeChange={onTypeChange} />
        <Tiles
          data={data.myNotes || data.notes || data.myCollaborations}
          updateFeed={onUpdate}
          refresh={onRefresh}
          refreshing={refreshing}
          LFC={fetching && <ActivityIndicator size="large" color="#D0D0D0" />}
          token={token}
          userId={userId}
          style={styles.Home}
        />
        <AddButton />
      </View>
    )
  }

  return (
    check && (
      <View style={styles.Home}>
        <Text style={{ alignSelf: 'center' }}>
          You have to login to view these notes.
        </Text>
      </View>
    )
  )
}

export default Feed

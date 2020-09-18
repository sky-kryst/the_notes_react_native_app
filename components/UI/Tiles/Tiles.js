import React from 'react'
import { FlatList, Text, View, RefreshControl, ScrollView } from 'react-native'
import Tile from '../Tile/Tile'
import styles from './Tiles.style'

const NoteTiles = ({
  data,
  refresh,
  refreshing,
  updateFeed,
  LFC,
  style,
  token,
  userId,
}) => {
  if (data.length < 1) {
    return (
      <ScrollView
        onRefresh={
          <RefreshControl onRefresh={refresh} refreshing={refreshing} />
        }
        contentContainerStyle={style}
      >
        <Text style={{ alignSelf: 'center' }}>
          Sorry nothing to see here. Start creating!
        </Text>
      </ScrollView>
    )
  }
  return (
    <View style={styles.Tiles}>
      <FlatList
        keyExtractor={({ id }) => id}
        data={data}
        onRefresh={refresh}
        refreshing={refreshing}
        onEndReachedThreshold={1}
        onEndReached={updateFeed}
        ListFooterComponent={LFC}
        ListFooterComponentStyle={{ marginVertical: 8 }}
        renderItem={({
          item: { id, title, body, creator, collaborator, consumer, likes },
        }) => (
          <Tile
            title={title}
            body={body}
            id={id}
            creator={creator}
            collaborator={collaborator}
            consumer={consumer}
            likes={likes}
            token={token}
            userId={userId}
          />
        )}
      />
    </View>
  )
}

export default NoteTiles

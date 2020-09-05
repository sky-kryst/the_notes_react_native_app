import { useQuery } from '@apollo/react-hooks'
import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { useStore } from '../hooks-store/store'
import NoDuplicateIDs from '../shared/noDuplicateIDs'

let canFetch = true

const useFeed = (query, check) => {
  const { token, userId } = useStore()[0].details
  const { searchValue } = useStore()[0].search
  const [refreshing, setRefreshing] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [type, setType] = useState('recent')
  const [NOOfNotes, setNOOfNotes] = useState(0)
  const [reloading, setReloading] = useState(false)

  const { loading, data, refetch, fetchMore } = useQuery(query, {
    skip: check && !token,
    pollInterval: 15 * 60 * 1000,
    variables: {
      first: 100,
      orderBy: 'updatedAt_DESC',
      ...(searchValue !== '' && { query: searchValue }),
    },
    onCompleted: (data = { a: [] }) => {
      setNOOfNotes(Object.values(data)[0].length)
    },
    onError: err =>
      Alert.alert(
        'Error!',
        err.message.split(':')[1],
        [
          {
            text: 'Try Again',
            onPress: () => onRefresh(),
          },
          { text: 'OK', onPress: () => {}, style: 'cancel' },
        ],
        { cancelable: true }
      ),
  })

  const onTypeChange = useCallback(
    type => {
      setReloading(true)
      fetchMore({
        variables: {
          first: NOOfNotes,
        },
        updateQuery: (_, { fetchMoreResult = { a: [] } }) => {
          const value = Object.values(fetchMoreResult)[0]
          const key = Object.keys(fetchMoreResult)[0]
          switch (type) {
            case 'mostLiked':
              return {
                [key]: value.sort((a, b) => b.likes.length - a.likes.length),
              }
            case 'leastLiked':
              return {
                [key]: value.sort((a, b) => a.likes.length - b.likes.length),
              }
            case 'mostViewed':
              return {
                [key]: value.sort(
                  (a, b) => b.consumer.length - a.consumer.length
                ),
              }
            case 'leastViewed':
              return value.sort((a, b) => a.consumer.length - b.consumer.length)
            case 'mostContributed':
              return {
                [key]: value.sort(
                  (a, b) => b.collaborator.length - a.collaborator.length
                ),
              }
            case 'leastContributed':
              return {
                [key]: value.sort(
                  (a, b) => a.collaborator.length - b.collaborator.length
                ),
              }
            default:
              return { [key]: value }
          }
        },
      }).then(() => setReloading(false))
    },
    [type, NOOfNotes]
  )

  const syncFeed = useCallback((prev, { fetchMoreResult = { a: [] } }) => {
    const key = Object.keys(fetchMoreResult)[0]
    if (fetchMoreResult[key].length < 1) {
      setFetching(false)
      return { ...prev }
    }
    const arr = NoDuplicateIDs(prev[key], fetchMoreResult[key])
    if (arr.length < 1) {
      canFetch = false
      setTimeout(() => (canFetch = true), 60 * 1000)
    }
    const notes = [...prev[key], ...arr]
    setNOOfNotes(notes.length)
    setFetching(false)
    return { ...prev, [key]: notes }
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch().then(() => setRefreshing(false))
  }, [])

  const onUpdate = useCallback(() => {
    if (canFetch && NOOfNotes >= 100) {
      setFetching(true)
      fetchMore({
        variables: {
          skip: NOOfNotes,
        },
        updateQuery: (p, n) => syncFeed(p, n),
      })
    }
  }, [canFetch, NOOfNotes])

  return {
    refreshing,
    fetching,
    type,
    setType,
    onRefresh,
    onUpdate,
    loading: loading || reloading,
    data,
    token,
    userId,
    onTypeChange,
  }
}

export default useFeed

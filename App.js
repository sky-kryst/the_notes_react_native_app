import { ApolloProvider } from '@apollo/react-hooks'
import AsyncStorage from '@react-native-community/async-storage'
import {
  InMemoryCache,
  // IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import styles from './App.style'
import RequestsProvider from './Context/Requests'
import AuthStore from './hooks-store/auth-details'
import SearchStore from './hooks-store/search-store'
import SignupStore from './hooks-store/signup-store'
import ClientStore from './hooks-store/client-store'
import { useStore } from './hooks-store/store'
import SubApp from './SubApp'
// import introspectionQueryResultData from './fragmentTypes.json'
import { resolvers } from './GraphQL'

AuthStore()
ClientStore()
SearchStore()
SignupStore()

const App = () => {
  const dispatch = useStore(false)[1]
  const { token } = useStore()[0].details
  const { client } = useStore()[0]

  useEffect(() => {
    console.ignoreWarnings = [
      'Found @client directives',
      'Setting a timer for a long period of time',
    ]
    const effect = async () => {
      const url = '://aakashmeshramnotesappgraphql.herokuapp.com'

      let authToken = (await AsyncStorage.getItem('token')) || null

      if (authToken && !token) {
        const userId = (await AsyncStorage.getItem('userId')) || null
        const expiresOn = (await AsyncStorage.getItem('expiresOn')) || null
        dispatch('SET_DETAILS', { token: authToken, userId, expiresOn })
      }

      const httpLink = createHttpLink({
        uri: `https${url}`,
      })

      const wsLink = new WebSocketLink({
        uri: `ws${url}`,
        options: {
          reconnect: true,
          ...(authToken && {
            connectionParams: {
              Authorization: `Bearer ${authToken}`,
              authToken,
            },
          }),
        },
      })

      const authLink = setContext((_, { headers = {} }) => {
        if (authToken) {
          headers.authorization = `Bearer ${authToken}`
        }
        return { headers }
      })

      const link = split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink
      )

      /* const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData,
      }) */

      const client = new ApolloClient({
        link: authLink.concat(link),
        cache: new InMemoryCache(/* { fragmentMatcher } */),
        resolvers,
      })

      dispatch('SET_CLIENT', client)
    }
    effect()
  }, [token])

  if (client) {
    return (
      <ApolloProvider client={client}>
        <RequestsProvider>
          <SubApp token={token} />
        </RequestsProvider>
      </ApolloProvider>
    )
  }

  return (
    <View style={styles.App}>
      <ActivityIndicator size="large" color="#D0D0D0" />
    </View>
  )
}

export default App

import { useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const useStore = () => {
  const client = useApolloClient()

  const getToken = () =>
    client.readQuery(gql`
      {
        auth @client {
          token
        }
      }
    `).auth.token

  const getUserId = () =>
    client.readQuery(gql`
      {
        auth @client {
          userId
        }
      }
    `).auth.userId

  const getExpiresOn = () =>
    client.readQuery(gql`
      {
        auth @client {
          expiresOn
        }
      }
    `).auth.expiresOn

  const getAuth = () =>
    client.readQuery(gql`
      {
        auth @client {
          token
          userId
          expiresOn
        }
      }
    `).auth

  const getSearchStatus = () =>
    client.readQuery(gql`
      {
        search @client {
          status
        }
      }
    `).search.status

  const getSearchValue = () =>
    client.readQuery(gql`
      {
        search @client {
          value
        }
      }
    `).search.value

  const getSearch = () =>
    client.readQuery(gql`
      {
        search @client {
          status
          value
        }
      }
    `).search

  return {
    client,
    getToken,
    getUserId,
    getExpiresOn,
    getAuth,
    getSearchStatus,
    getSearchValue,
    getSearch,
  }
}

export default useStore

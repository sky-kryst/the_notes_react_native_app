import gql from 'graphql-tag'
export const resolvers = {
  Mutation: {
    createNote: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'Note', id: variables.id })
      cache.writeData({ id, data: variables.note })
      return null
    },
    updateNote: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'Note', id: variables.id })
      const fragment = gql`
        fragment note on Note {
          id
          title
          body
          creator {
            id
          }
          collaborator {
            id
          }
          consumer {
            id
          }
        }
      `
      const note = cache.readFragment({ fragment, id })
      const data = { ...note, ...variables.note }
      cache.writeData({ id, data })
      return null
    },
    deleteRequest: (parents, args, cntxt, info) => {
      const id = getCacheKey({ __typename: 'Request', id: variables.id })
      const fragment = gql`
        fragment request on Request {
          id
          title
          body
          creator {
            id
          }
          collaborator {
            id
          }
          consumer {
            id
          }
        }
      `
      const request = cache.readFragment({ fragment, id })
      const data = { ...note, ...variables.note }
      cache.writeData({ id, data })
      return null
    },
  },
}

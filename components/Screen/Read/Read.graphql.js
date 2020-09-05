import gql from 'graphql-tag'

export const GET_NOTE = gql`
  query getNote($id: String) {
    note(id: $id) {
      title
      body
      creator {
        id
      }
    }
  }
`

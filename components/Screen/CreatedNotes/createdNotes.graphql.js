import gql from 'graphql-tag'

export default gql`
  query MyNotes(
    $query: String
    $first: Int
    $skip: Int
    $orderBy: NoteOrderByInput
  ) {
    myNotes(query: $query, first: $first, skip: $skip, orderBy: $orderBy) {
      id
      title
      body
      creator {
        id
      }
      likes {
        id
      }
    }
  }
`

import gql from 'graphql-tag'
export default gql`
  query MyCollaborations(
    $query: String
    $first: Int
    $skip: Int
    $orderBy: NoteOrderByInput
  ) {
    myCollaborations(
      query: $query
      first: $first
      skip: $skip
      orderBy: $orderBy
    ) {
      id
      title
      body
      collaborator {
        id
      }
      likes {
        id
      }
    }
  }
`

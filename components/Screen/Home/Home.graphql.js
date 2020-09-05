import gql from 'graphql-tag'

export default gql`
  query Notes(
    $query: String
    $first: Int
    $skip: Int
    $orderBy: NoteOrderByInput
  ) {
    notes(query: $query, first: $first, skip: $skip, orderBy: $orderBy) {
      id
      title
      body
      creator {
        id
        notificationToken
      }
      collaborator {
        id
      }
      consumer {
        id
      }
      likes {
        id
      }
    }
  }
`

import React from 'react'
import Feed from '../../UI/Feed/Feed'
import GET_MY_COLLABORATIONS from './sharedNotes.graphql'

const SharedNotes = () => <Feed query={GET_MY_COLLABORATIONS} check={true} />

export default SharedNotes

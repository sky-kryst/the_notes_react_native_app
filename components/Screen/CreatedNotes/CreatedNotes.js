import React from 'react'
import Feed from '../../UI/Feed/Feed'
import GET_MY_NOTES from './createdNotes.graphql'

const CreatedNotes = () => <Feed query={GET_MY_NOTES} check={true} />

export default CreatedNotes

import React, { useState } from 'react'

export const RequestsContext = React.createContext({
  isRequest: false,
  requests: [],
})

const RequestsContextProvider = props => {
  const [requests, setRequests] = useState([])
  const [isRequest, setIsRequest] = useState(false)

  return (
    <RequestsContext.Provider
      value={{
        isRequest,
        requests,
        setRequests,
        setIsRequest,
      }}
    >
      {props.children}
    </RequestsContext.Provider>
  )
}

export default RequestsContextProvider

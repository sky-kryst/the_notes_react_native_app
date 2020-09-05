import { useQuery, useSubscription } from '@apollo/react-hooks'
import { useContext, useEffect } from 'react'
import { RequestsContext } from '../Context/Requests'
import NoDuplicateIDs from '../shared/noDuplicateIDs'

const useRequests = (getQuery, subscriptionQuery, token) => {
  const { setRequests, setIsRequest } = useContext(RequestsContext)

  useEffect(() => {
    if (!token) {
      setIsRequest(pS => {
        pS && false
      })
      setRequests(pS => {
        if (pS !== []) return []
      })
    }
  }, [token])

  useQuery(getQuery, {
    skip: !token,
    variables: {
      first: 15,
      orderBy: 'updatedAt_DESC',
    },
    onCompleted: (data = { a: [] }) => {
      const res = Object.values(data)[0]
      setRequests(pS => {
        if (pS.length < 1) return [...res]
        const arr = NoDuplicateIDs(pS, res)
        return [...res, ...pS]
      })
      setIsRequest(pS => {
        if (!pS) return true
      })
    },
  })

  useSubscription(subscriptionQuery, {
    skip: !token,
    shouldResubscribe: true,
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      const res = Object.values(data)[0].node
      setRequests(pS => [res, ...pS])
      setIsRequest(pS => {
        if (!pS) return true
      })
    },
  })
}

export default useRequests

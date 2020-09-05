import { useEffect } from 'react'
const useSignup = dispatch => {
  useEffect(() => () => dispatch('REMOVE_SIGNUP'), [])
}

export default useSignup

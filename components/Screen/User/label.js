export default label = e => {
  switch (e) {
    case 'firstName':
      return 'First Name:'
    case 'lastName':
      return 'Last Name:'
    case 'username':
      return 'Username:'
    case 'email':
      return 'Email:'
    case 'password':
      return 'Password:'
    default:
      return null
  }
}

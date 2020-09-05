export default fn = (presentArray, nextArray) => {
  const isArray = Array.isArray(presentArray)
  let arr = isArray ? [] : false
  nextArray.forEach(e => {
    let a = true
    if (isArray) {
      presentArray.forEach(l => {
        if (e.id === l.id) {
          a = false
        }
      })
      a && arr.push(e)
    } else {
      if (e.id === presentArray) arr = true
    }
  })
  return arr
}

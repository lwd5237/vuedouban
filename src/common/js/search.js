const storage = window.localStorage
export function setHis(query) {
  if (query === '') {
    let arr = getLCHistory()
    return arr
  }
  if (storage.getItem('history')) {
    let arr = JSON.parse(storage.getItem('history'))
    let index = -1
    arr.forEach((el, i) => {
      if (el === query) {
        index = i
      }
    })
    if (index === -1) {
      arr.unshift(query)
      storage.setItem('history', JSON.stringify(arr))
      return arr
    } else {
      return arr
    }
  } else {
    let arr = []
    arr.unshift(query)
    storage.setItem('history', JSON.stringify(arr))
    return arr
  }
}

export function emptyHis() {
  let arr = []
  storage.setItem('history', JSON.stringify(arr))
  return arr
}

export function deleteHis(data) {
  let arr = JSON.parse(storage.getItem('history'))
  let index = -1
  arr.forEach((el, i) => {
    if (el === data) {
      index = i
    }
  })
  arr.splice(index, 1)
  storage.setItem('history', JSON.stringify(arr))
  return arr
}

function getLCHistory() {
  let arr = storage.getItem('history')
  if (!arr) {
    let brr = []
    return brr
  }
  return JSON.parse(arr)
}
const storage = window.localStorage
export function setWant(data) {
  if (data === '') {
    let arr = getLCWant()
    return arr
  }
  if (storage.getItem('want')) {
    let arr = []
    arr = JSON.parse(storage.getItem('want'))
    let index = -1
    arr.forEach((el, i) => {
      if (el === data) {
        index = i
      }
    })
    if (index > -1) {
      arr.splice(index, 1)
      storage.setItem('want',JSON.stringify(arr))
      return arr
    } else {
      arr.push(data)
      storage.setItem('want',JSON.stringify(arr))
      return arr
    }
  } else {
    let arr = []
    arr.push(data)
    storage.setItem('want', JSON.stringify(arr))
    return arr
  }
}

export function setWatched(data) {
  if (data === '') {
    let arr = getLCWatched()
    return arr
  }  
  if (storage.getItem('watched')) {
    let arr = []
    arr = JSON.parse(storage.getItem('watched'))
    let index = -1
    arr.forEach((el, i) => {
      if (el === data) {
        index = i
      }
    })
    if (index > -1) {
      arr.splice(index, 1)
      storage.setItem('watched',JSON.stringify(arr))
      return arr
    } else {
      arr.push(data)
      storage.setItem('watched',JSON.stringify(arr))
      return arr
    }
  } else {
    let arr = []
    arr.push(data)
    storage.setItem('watched', JSON.stringify(arr))
    return arr
  }
}

function getLCWant() {
  let arr = storage.getItem('want')
  if (!arr) {
    let brr = []
    return brr
  }
  return JSON.parse(arr)
}

function getLCWatched() {
  let arr = storage.getItem('watched')
  if (!arr) {
    let brr = []
    return brr
  }
  return JSON.parse(arr)
}
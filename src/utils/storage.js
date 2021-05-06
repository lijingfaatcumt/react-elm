const storage = localStorage

function setItem(key, value) {
  storage.setItem(key, JSON.stringify(value))
}

function getItem(key) {
  let result = storage.getItem(key)
  if (result) {
    try {
      result = JSON.parse(result)
    } catch (err) {
      console.error(err)
    }
  }
  return result
}

function remove(key) {
  storage.removeItem(key)
}

function clear() {
  storage.clear()
}

export default {
  setItem,
  getItem,
  remove,
  clear
}

// ---- Array.prototype.reduce() ----
// #1 Recursive approach
const reduce = (arr, cb, initialValue) => {
  if (!arr.length && typeof initialValue === undefined) throw new Error('Empty array with no initial value')

  // initial value is now the first item in the array
  if (initialValue) {
    arr = [initialValue, ...arr]
  }

  const recurse = (arr, current, cb) => {
    if (!arr.length) return current

    const next = arr.shift()
    const acc = cb(current, next)

    return recurse(arr, acc, cb)
  }

  return recurse(arr.slice(1), arr[0], cb)
}

const cb = (acc, cur) => {  
  acc += cur
  return acc
}

const arr = [1, 2, 3]
// const arr = ['a', 'b', 'c']
const result = reduce(arr, cb, 1) // expected output: 7
console.log(result)

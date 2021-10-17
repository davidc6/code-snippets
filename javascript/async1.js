// some asynchronous function
const asyncFnB = async (arg) => {
  console.log('B')

  if (arg === 2) {
    return new Promise((res, rej) => setTimeout(() => rej('hello'), 2000))
  }

  return new Promise((res, rej) => setTimeout(() => res('hello'), 2000))
}

// flags used for when we are waiting for async operation to complete
let isError = false
let isChecking = false
let queue = []

// async function
const asyncFn = async (arg) => {
  if (isError) {
    return
  }

  if (!isChecking) {
    isChecking = true
    try {
      await asyncFnB(arg)
      isChecking = false
    } catch (e) {
      isError = true
      console.log('ERROR')
    }
    return
  }

  if (isChecking) {
    queue.push(arg)
    console.log('push', arg)
  }
}

// we should expect to see
// B, 1.5, 2, 4
const runAsyncFns = async () => {
  asyncFn('1')
  asyncFn('1.5')
  asyncFn(2)
  asyncFn('4')
}

runAsyncFns()

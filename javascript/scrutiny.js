// Implementation --------------------------------------------------------------

const test = (description, cb) => {
  try {
    cb()
    console.log(`${description} - passed`)
  } catch (e) {
    console.log(`${description} - failed - ${e.message}`)
  }  
}

const expect = (actual) => {
  const toBe = (expected) => {
    if (actual != expected) throw new Error(`${actual} not the same as ${expected}`)
  }
  
  const toHaveBeenCalled = () => {
    return actual.callCount() > 0 ? true : false
  }

  return {
    toBe,
    toHaveBeenCalled
  }
}

const fn = () => {
  const mock = {
    callCount: 0,
    args: []
  }

  const mockFn = (...args) => {
    mock.callCount += 1
    mock.args.push(args)
  }
  
  mockFn.callCount = () => mock.calls
  mockFn.mock = mock
  
  return mockFn
}

const scrutiny = {
  fn
}

// Tests -----------------------------------------------------------------------

const areWeUsingJavaScript = () => true

test('Are we using JavaScript?', () => {
  expect(areWeUsingJavaScript()).toBe(true)
})

test('Are we using JavaScript?', () => {
  expect(areWeUsingJavaScript()).toBe(false)
})

const isValidOption = (cb, option) => {
  if (option === 'one') {
    return cb(true)
  }

  return cb(false)
}

test('Is "one" a valid option?', () => {
  const spy = scrutiny.fn()

  isValidOption(spy, 'one')

  expect(spy).toHaveBeenCalled()
})

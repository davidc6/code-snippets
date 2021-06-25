function anotherFn() {
  const a = function () {
    arguments.callee.calls = arguments.callee.calls + 1
    arguments.callee.args.push([...arguments])
    arguments.callee.firstCallArgs = arguments.callee.args[0]
    
    // arguments.callee.propB = yo
    // console.log(...arguments);
  }
  
  a.calls = 0
  a.args = []
  a.firstCallArgs = []
  
  return a
}

// const lets = anotherFn()

const scrutiny = {
  spy: anotherFn
}

// How to use ------------------------------------------------------------------

const spy = scrutiny.spy()

const someFunc = {
  doSomething: (whatToDo, howToDo) => {
    howToDo(whatToDo, 'Test')
  }
}

someFunc.doSomething('Work', spy)
someFunc.doSomething('House', spy)

console.log(spy.calls)
console.log(spy.firstCallArgs)

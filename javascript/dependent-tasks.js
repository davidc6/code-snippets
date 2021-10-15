class Logger {
  constructor() {
    this.queue = []
    this.firstRequestTookPlace = false
  }

  async request(event) {
    return new Promise((res, rej) => {
      setTimeout(res, 1000, event)
    })
  }

  async firstRequest(event) {
    return new Promise((res, rej) => {
      setTimeout(res, 2000, event)
    })
  }

  drainQueue() {
    return Promise.allSettled(this.queue.map((event) => {
      return this.request(event)
    }))
  }

  async send(event) {
    if (this.firstRequestTookPlace === false) {
      this.firstRequestTookPlace = true
    
      try {
        const response = await this.firstRequest(event)
        console.log(response)
        const result = await this.drainQueue()
        console.log(result)
      } catch (e) {
        console.log(e)
        return
      }
      return
    }

    this.queue.push(event)
  }
}

const l = new Logger()
l.send(1)
l.send(2)
l.send(3)
l.send(4)

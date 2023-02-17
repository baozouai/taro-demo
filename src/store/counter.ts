import { makeAutoObservable } from 'mobx'

class Store {
  bears = 0
  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  increasePopulation() {
    this.bears++
  }

  removeAllBears() {
    this.bears = 0
  }
}

export default new Store()

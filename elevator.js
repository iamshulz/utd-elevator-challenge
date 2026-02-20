export default class Elevator {
  constructor() {
    this.currentFloor = 0
    this.stops = 0
    this.floorsTraversed = 0
    this.requests = []
    this.riders= []
  }

  dispatch(){
    this.requests.forEach(request => {
      if(this.riders.length || this.requests.length){
        this.goToFloor(request)
      }
    })
  }

  goToFloor(person){

    while (this.currentFloor < person.currentFloor) {
      this.moveUp()
    }
    while (this.currentFloor > person.currentFloor) {
      this.moveDown()
    }

    //Check if there are any pickups
    this.hasPickup()

    //calls elevator to move up if elevator is lower than the persons drop off
    while (this.currentFloor < person.dropOffFloor) {
      this.moveUp()
    }
    //calls elevator to move down if the elevator is higher than the persons drop off
    while (this.currentFloor > person.dropOffFloor) {
      this.moveDown()
    }

    this.hasDropoff()
  }

  moveUp(){
    this.currentFloor++
    this.floorsTraversed++
    if(this.hasStop()){
      this.stops++
    }    
  }

  moveDown(){
    if(this.currentFloor > 0){      
      this.currentFloor--
      this.floorsTraversed++
      if(this.hasStop()){
        this.stops++
      }
    }
  }

  hasStop(){
    // add your code here
    return this.hasPickup() || this.hasDropoff()
  }

  hasPickup(){
    const person = this.requests.find(p => p.currentFloor === this.currentFloor)
    if (person) {
      // basically opposite of drop-off; add them as a rider if request is same with current floor
      this.requests.splice(this.requests.indexOf(person), 1)
      this.riders.push(person)
      return true
    }
    return false
  }

  hasDropoff(){
    // Check if the elevator is on the drop-off floor of the person
    const person = this.riders.find(p => p.dropOffFloor === this.currentFloor)

    // Check if someone's on the drop-off floor
    if(person){
      // Get the index of that person and remove them as a rider
      this.riders.splice(this.riders.indexOf(person), 1)
      return true
    }
    return false
  }

  checkReturnToLoby(){
    return new Date().getHours() < 12 && !this.riders.length
  }

  returnToLoby(){
    while(this.currentFloor > 0){
      this.moveDown()
    }
  }

  reset(){
    this.currentFloor = 0
    this.stops = 0
    this.floorsTraversed = 0
    this.riders = []
  }
}

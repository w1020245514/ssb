import { observable } from 'mobx'
import Api from '../utils/api'

const counterStore = observable({
  counter: 0
})

counterStore.increment = function () {
  this.counter++
}

counterStore.decrement = function() {
  this.counter--
}

counterStore.incrementAsync = function() {
  setTimeout(() => {
    this.counter++
  }, 1000);
}

counterStore.getareabyid = function(){
  let params = {'areaId':4};
  const res = Api.get('getareabyid', params);
  console.log(JSON.stringify(res));
}

export default counterStore
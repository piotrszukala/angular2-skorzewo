// This proxy gives sure that data stored in State are immutable
// These are set of immutable operations 
import { Injectable } from '@angular/core';
import { Store } from '../store';

@Injectable()
export class StoreHelper {

  constructor(private store: Store) {}

  update(prop, state) {
    // gets poprerty name in string and valies of that prop
    // This object is concatinated with current state and stored in state service
    // Copies from state service to this one
    const currentState = this.store.getState();
    this.store.setState(Object.assign({}, currentState, { [prop]: state }));
  }

  add(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, { [prop]: [state, ...collection] }));
  }
  findAndUpdate(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id !== state.id) {
        return item;
      }
      return Object.assign({}, item, state)
    })}))
  }
  findAndDelete(prop, id) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.filter(item => item.id !== id)}));
  }
}
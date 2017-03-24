// Services that store state of app
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import  { Injectable } from '@angular/core';
import 'rxjs/Rx';

// Lista nazwisk
export interface SurnameList {
  [index: number]: string
}

// OsobyAll interface
export interface OsobyAll {
  id: number
  imie: string
  nazwisko: string
  uwagi: string // ? means this is  optional
  parcela: string | number
  rzad: string | number
  kwatera: string | number
  typ: string
  foto: string
}

// Interfaces objects
export interface Note {
  color: string
  title: string
  value: string
  id?: string | number // ? means this is  optional
  createdAt?: string
  updatedAt?: string
  userId?: string
}

export interface User {
  // If something is fraking out properties could be optional (with ?)
  id?: string
}

// Interface od notes. It is an array of notes
export interface State {
  // requires Note interface from above
  surnameList: SurnameList[],
  personList: Array<any>,
  osobyAll: OsobyAll[],
  notes: Note[], // Is the same as Array<Note>
  user: User
}

//Default state
// This app has only one state "notes" thus this one and same default state
const defaultState: State = {
  surnameList: ["Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus",
                        "Belgium","Bosnia & Herzegovina","Bulgaria","Croatia","Cyprus",
                        "Czech Republic","Denmark","Estonia","Finland","France","Georgia",
                        "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo",
                        "Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta",
                        "Moldova","Monaco","Montenegro","Netherlands","Norway","Poland",
                        "Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia",
                        "Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"],
  personList: [{name: "Iwona", surname: "Nowak", birth: 1960, death: 2000}],
  osobyAll: [],
  notes: [],
  user: {}
}

// Create a store
const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  private store = _store;

  // This is behavior object ???
  // This set all states to immutable
  changes = this.store.asObservable()
  // This will fire each time store is changed
  .distinctUntilChanged()

  setState(state: State) {
    this.store.next(state)
  }
  
  // Returns values of default store. In this case these are notes
  getState(): State {
    return this.store.value;

  }

  purge() {
    this.store.next(defaultState);
  }

}

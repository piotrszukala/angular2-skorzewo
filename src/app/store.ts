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

export interface Persons {}

export interface User {
  // If something is fraking out properties could be optional (with ?)
  id?: string
}

export interface Graves {}

export interface PersonsByGrave {} 

// Interface od notes. It is an array of notes
export interface State {
  // requires Note interface from above
  surnameList: SurnameList[],
  personList: Array<any>,
  osobyAll: OsobyAll[],
  notes: Note[], // Is the same as Array<Note>
  user: User,
  persons: Persons,
  graves: Graves,
  personsByGrave: PersonsByGrave[]
}



//Default state
// This app has only one state "notes" thus this one and same default state
const defaultState: State = {
  surnameList: [],
  personList: [],
  osobyAll: [],
  notes: [],
  user: {},
  persons: [],
  graves: {},
  personsByGrave: []

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

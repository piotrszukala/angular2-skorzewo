import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { StoreHelper } from './store-helper'
import 'rxjs/Rx';

@Injectable()
export class NoteService {
  path: string = '/notes';
  
  constructor(
    private apiService: ApiService,
    private storeHelper: StoreHelper
  ) {}

  createNote(note) {
    return this.apiService.post(this.path, note)
    // Implement state...
    // savedNote is a callback from api
    .do(savedNote => this.storeHelper.add('notes', savedNote))
  }

  getNotes() {
    return this.apiService.get(this.path)
    .do((resp: any) => this.storeHelper.update('notes', resp.data))
  }

  completeNote(note) {
    return this.apiService.delete(`${this.path}/${note.id}`)
    .do((resp: any) => this.storeHelper.findAndDelete('notes', resp.id))
  }
}
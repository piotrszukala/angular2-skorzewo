import { Component } from '@angular/core';
import { Store } from "../../store";
import { ApiService } from "../../services/api";
import { StoreHelper } from "../../services/store-helper";


@Component({
  selector: 'person-list',
  template: require('./person-list.component.html'),
  styles: [
    require ('./style.scss')
  ]
})
export class PersonListComponent {

  public personList: Array<any>;

  constructor (
    private store: Store,
    private api: ApiService,
    private storeHelper: StoreHelper
  ) {
    this.personList = this.store.getState().personList;   
  }

  getOsoby(req) {
    return this.api.get('/groby', req)
    .do((resp:any) => this.storeHelper.update('groby', resp))
  }

  select(person) {
    this.getOsoby({person})
    .subscribe()
  }
  
}
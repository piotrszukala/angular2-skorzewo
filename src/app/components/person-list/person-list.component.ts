import { Component } from '@angular/core';

@Component({
  selector: 'person-list',
  template: require('./person-list.component.html'),
  styles: [
    require ('./style.scss')
  ]
})
export class PersonListComponent {
  constructor () {}
  
}
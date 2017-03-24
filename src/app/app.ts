import { Component } from '@angular/core';

@Component({
  selector: 'app',
  // was component in template <main-controller>
  // To implement routing should point router where to start <router-outlet>
  template: `
    <router-outlet></router-outlet>
  `
})

export class App {};
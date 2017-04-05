import { Component } from '@angular/core';

@Component({
  selector: 'main-container',
  // Instead piont to component name <notes-container>
  // It is enought to paste <router-outlet> 
  template: `
    <div class="main-container">
      <app-bar></app-bar>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .main-container {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class MainContainer {};
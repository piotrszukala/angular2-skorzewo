import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// Module needed to http service
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Widoczne w plikach index.ts
// providers is an array of services
import { App, providers, routes } from './app';
import { MainContainer, AuthContainer, GridContainer, MapContainer } from './app/pages';
import { AppBar, MarkerComponent, SearchComponent, SidebarComponent } from  './app/components';

import { AgGridModule } from 'ag-grid-ng2/main';
import { MaterialModule } from '@angular/material';
import { SidebarModule } from 'ng-sidebar';

import 'hammerjs';


@NgModule({
  declarations: [
    App, 
    MainContainer,
    AppBar,
    AuthContainer,
    GridContainer,
    MapContainer,
    MarkerComponent,
    SearchComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
    AgGridModule.withComponents([]),
    MaterialModule.forRoot(),
    SidebarModule.forRoot(),
    routes // because routes is a module (MOduleWithProviders) it should be injecteds here
  ],
  providers: providers,
  bootstrap: [App]
})
export class AppModule{};

platformBrowserDynamic().bootstrapModule(AppModule);

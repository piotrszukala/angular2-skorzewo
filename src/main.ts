import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { MapModule } from './app/modules'
// Module needed to http service
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// Widoczne w plikach index.ts
// providers is an array of services
import { App, providers, routes } from './app';
import { MainContainer, AuthContainer, GridContainer, MapContainer } from './app/pages';
import { PersonListComponent, SearchComponent, SidebarComponent, MarkerComponent, AppBar } from './app/components';
import { AgGridModule } from 'ag-grid-ng2/main';

@NgModule({
  declarations: [
    App, 
    // MapContainer,
    MainContainer,
    AuthContainer,
    GridContainer,
    AppBar
  ],
  imports: [
    BrowserModule, 
    MapModule,
    FormsModule,
    MaterialModule.forRoot(),
    AgGridModule.withComponents([]),
    routes // because routes is a module (MOduleWithProviders) it should be injecteds here
  ],
  providers: providers,
  bootstrap: [App]
})
export class AppModule{};

platformBrowserDynamic().bootstrapModule(AppModule);

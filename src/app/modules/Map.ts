import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { SidebarModule } from 'ng-sidebar';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { providers, routes } from '../';
// import { RouterModule, Routes } from '@angular/router';

import { MapContainer } from '../pages';
import { PersonListComponent, SearchComponent, SidebarComponent, MarkerComponent, AppBar } from '../components';

import 'hammerjs';

@NgModule({
    declarations: [ 
        MapContainer,
        MarkerComponent,
        SearchComponent,
        SidebarComponent,
        PersonListComponent,
        // AppBar
        // Component10Component,
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MaterialModule.forRoot(),
        SidebarModule.forRoot(),
        // RouterModule
        routes // because routes is a module (MOduleWithProviders) it should be injecteds here
    ],
    exports: [ 
        // MapContainer,
        // Component10Component,
    ],
    // providers: providers,
    // providers: [ MessageService ]
})
export class MapModule { }
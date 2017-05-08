import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { providers } from '../';

import { ModalComponent, MapPopupContent } from '../components';

import 'hammerjs';

@NgModule({
    declarations: [ 
        ModalComponent,
        MapPopupContent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MaterialModule.forRoot()
    ],
    exports: [ 
       ModalComponent,
       MapPopupContent
    ]
})
export class MapPopupModule { }
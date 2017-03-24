import { Component, ViewEncapsulation } from '@angular/core';
import { OsobyGridService } from '../../services';
import { Store } from '../../store';

import {GridOptions} from 'ag-grid/main';



@Component({
  selector: 'about-container',
  template: `
    <div class="about-container">
      <h1>about page</h1>
      <ag-grid-ng2
        #agGrid style="width: 100%; height: 350px;" class="ag-bootstrap ag-striped"

    
        [gridOptions]="gridOptions"
        [columnDefs]="columnDefs"
        [showToolPanel]="showToolPanel"
        [rowData]="rowData"


        enableColResize
        enableSorting
        enableFilter


        rowHeight="35"
        rowSelection="multiple"
    ></ag-grid-ng2>
    </div>

  `,
  styles: [
    require('ag-grid/dist/styles/ag-grid.css'), 
    // require('./theme-fresh.css')
    require('./theme-bootstrap.css')
  ],
  encapsulation: ViewEncapsulation.None
})
export class GridContainer {

    private gridOptions:GridOptions;
    public showGrid:boolean;
    public rowData:any[];
    private columnDefs:any[];
    public rowCount:string;

    constructor(
        private osobyGridService: OsobyGridService,
        private store: Store
    ) {
        const that = this;
        this.osobyGridService.getOsobyAll()
        .subscribe();
        
        this.store.changes
        .map(data => data.osobyAll)
        .subscribe(osobyAll => {
            this.rowData = osobyAll
        })
        

        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{
          rowSelection: 'single',
          headerHeight: 30,
          suppressCellSelection: true
        };
     
 
        // this.gridOptions.rowData = this.osobyAll        
        this.gridOptions.columnDefs = this.createColumnDefs();

    
    }



private onCellValueChanged($event) {
        this.gridOptions.api.refreshCells([$event.node],["cube"]);
    }

    private createColumnDefs() {
        return [
            {headerName: "id", field: "id", width: 50},
            {
                headerName: "Imię",
                field: "imie",
                // cellRendererFramework: SquareComponent,
                editable:true,
                // colId: "square",
                width: 100
            },
            {
                headerName: "Nazwisko",
                field: "nazwisko",
                // cellRendererFramework: CubeComponent,
                // colId: "cube",
                width: 100
            },
            {
                headerName: 'Data urodzenia',
                children: [
                    {
                        headerName: "rok",
                        field: "nazwisko",
                        // cellRendererFramework: CubeComponent,
                        // colId: "cube",
                        width: 100
                    },
                                {
                        headerName: "miesiąc",
                        field: "nazwisko",
                        // cellRendererFramework: CubeComponent,
                        // colId: "cube",
                        width: 100
                    },
                                {
                        headerName: "dzień",
                        field: "nazwisko",
                        // cellRendererFramework: CubeComponent,
                        // colId: "cube",
                        width: 100
                    }
                ]
            },
            {
                headerName: 'Data śmierci',
                children: [
                    {
                        headerName: "rok",
                        field: "nazwisko",
                        // cellRendererFramework: CubeComponent,
                        // colId: "cube",
                        width: 100
                    },
                                {
                        headerName: "miesiąc",
                        field: "nazwisko",
                        // cellRendererFramework: CubeComponent,
                        // colId: "cube",
                        width: 100
                    },
                                {
                        headerName: "dzień",
                        field: "nazwisko",
                        // cellRendererFramework: CubeComponent,
                        // colId: "cube",
                        width: 100
                    }
                ]

            },
            {
                headerName: 'Dane nagrobka',
                children: [
                    {
                headerName: "Rząd",
                field: "rzad",
                // cellRendererFramework: ParamsComponent,
                colId: "params",
                width: 245
            },
            {
                headerName: "Kwatera",
                field: "kwatera",
                // cellRendererFramework: CurrencyComponent,
                colId: "params",
                width: 150
            },
            {
                headerName: "Parcela",
                field: "parcela",
                // cellRendererFramework: CurrencyComponent,
                colId: "params",
                width: 150
            }
                ]
            }
                        
                               
            
        ];
    }

}
import { Component, OnInit } from '@angular/core';
import { Store } from "../../store";
import { ApiService } from "../../services/api";
import { StoreHelper } from "../../services/store-helper";
import { MapService } from "../../services";


@Component({
    selector: 'person-list',
    template: require('./person-list.component.html'),
    styles: [
        require('./style.scss')
    ]
})
export class PersonListComponent implements OnInit {

    public personList: Array<any>;

    constructor(
        private store: Store,
        private api: ApiService,
        private storeHelper: StoreHelper,
        private mapService: MapService
    ) { }

    ngOnInit() {
        this.store.changes.pluck('personList')
            .subscribe((personList: any) => this.personList = personList);
    }


    select(person:object) {
        this.mapService.getSelectedGrave(person);
    }

}
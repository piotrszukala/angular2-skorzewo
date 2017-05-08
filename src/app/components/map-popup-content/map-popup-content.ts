import {Component, ElementRef, OnInit} from "@angular/core";
import { Store } from "../../store";
import { ApiService } from "../../services/api";
import { StoreHelper } from "../../services/store-helper";
import { ModalService } from "../../services";


@Component({
    selector: "map-popup-content",
    template: require("./map-popup-content.html"),
    styles: [
        require("./styles.scss")
    ],
    providers: []
})

export class MapPopupContent implements OnInit{

    public personsByGrave: Array<any>;
    
    constructor(
        private store: Store,
        private api: ApiService,
        private storeHelper: StoreHelper,
        private modalService: ModalService
        ) {
        this.store.changes.pluck('personsByGrave')
        .subscribe((personsByGrave: any) => this.personsByGrave = personsByGrave);
    }

    ngOnInit() {}

    closeModal(id: string){
        this.modalService.close(id);
    }
}
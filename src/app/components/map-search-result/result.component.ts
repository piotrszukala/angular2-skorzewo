import { Component, Input } from "@angular/core";
import { Store } from "../../store";
import { ApiService } from "../../services/api";
import { StoreHelper } from "../../services/store-helper";

@Component({
    selector: "search-result",
    template: require("./result.component.html"),
    styles: [
        require("./result.component.scss")
    ]
})

export class ResultComponent {
    public personList = [];
 
    constructor(
        private store: Store,
        private api: ApiService,
        private storeHelper: StoreHelper
        ) {
        this.personList = this.store.getState().personList;   
    }
    
    openSidenav(sidebar) {
        sidebar.open()
    }
}
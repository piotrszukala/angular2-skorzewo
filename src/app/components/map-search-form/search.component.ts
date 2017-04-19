import {Component, ElementRef} from "@angular/core";
import { Store } from "../../store";
import { ApiService } from "../../services/api";
import { StoreHelper } from "../../services/store-helper";
import { MapService } from "../../services/map.service";
// import {GeocodingService} from "../../services/geocoding.service";
// import {MapService} from "../../services/map.service";
// import {Location} from "../../core/location.class";
// import {Map} from "leaflet";

@Component({
    selector: "search-form",
    template: require("./search.component.html"),
    styles: [
        require("./search.component.scss")
    ],
    host: {
        '(document:click)': 'handleClick($event)',
    },
    providers: []
})

export class SearchComponent {
    public query = '';
    public surnameList: Array<any>;
    public filteredList = [];
    public elementRef;
 
    constructor(
        myElement: ElementRef,
        private store: Store,
        private api: ApiService,
        private storeHelper: StoreHelper,
        private mapService: MapService
        ) {
        this.elementRef = myElement;
            
        this.surnameList = this.store.getState().surnameList;   
    }

    filter() {
        if (this.query !== "") {
            this.filteredList = this.surnameList.filter(function(el){
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredList = [];
        }
    }
    
    
    getOsoby(req) {
        this.mapService.getPerosonsBySurname(req)
        .subscribe();
    }

    select(item) {
        this.query = item;
        this.filteredList = [];
        this.getOsoby({item})
    }

    handleClick(event){
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        
        if(!inside){
            this.filteredList = [];
        }
    }

}
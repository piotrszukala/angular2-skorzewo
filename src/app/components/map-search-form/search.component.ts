import {Component, ElementRef} from "@angular/core";
import { Store } from "../../store";
import { ApiService } from "../../services/api";
import { StoreHelper } from "../../services/store-helper";
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
// export class SearchComponentxxx {
//     address: string;

//     private map: Map;

//     constructor(
//         // private geocoder: GeocodingService, 
//         private mapService: MapService
//     ) {
//         this.address = "";
//     }

//     ngOnInit() {
//         this.mapService.disableMouseEvent("goto");
//         this.mapService.disableMouseEvent("place-input");
//         this.map = this.mapService.map;
//     }

    // goto() {
    //     if (!this.address) { return; }

    //     this.geocoder.geocode(this.address)
    //     .subscribe(location => {
    //         this.map.fitBounds(location.viewBounds, {});
    //         this.address = location.address;
    //     }, error => console.error(error));
    // }
// }

export class SearchComponent {
    

    public query = '';
    public countries: Array<any>;
    public filteredList = [];
    public elementRef;
 
    constructor(
        myElement: ElementRef,
        private store: Store,
        private api: ApiService,
        private storeHelper: StoreHelper
        ) {
        this.elementRef = myElement;
            
        this.countries = this.store.getState().surnameList;   
    }

    filter() {
        if (this.query !== "") {
            this.filteredList = this.countries.filter(function(el){
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredList = [];
        }
    }
    
    
    getOsoby(req) {
        return this.api.get('/getOsoby', req)
        .do((resp:any) => this.storeHelper.update('osobyList', resp))
    }

    select(item) {
        this.query = item;
        this.filteredList = [];
        this.getOsoby({item})
        .subscribe()
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
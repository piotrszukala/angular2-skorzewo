import { Injectable } from "@angular/core";
// import {Location} from "../core/location.class";
import { Map } from "leaflet";
import { Http } from "@angular/http";
import { ApiService } from "./api";
import { StoreHelper } from "./store-helper";
import { Store } from "../store";
import { ModalService } from "./modal.service"; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class MapService {
    public map: Map;
    public baseMaps: any;
    private graves: any;
    private vtLayer: any = L.geoJSON();

    private selectedStyle: any = {
        color: "#ff7800"
    }
    private selectedGrave: any = L.geoJSON()



    constructor(
        private store: Store,
        private api: ApiService,
        private storeHelper: StoreHelper,
        private modalService: ModalService
    ) {
        this.baseMaps = {
            OpenStreetMap: L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            }),
            Esri: L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            }),
            CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            })
        };

    }

    disableMouseEvent(elementId: string) {
        let element = <HTMLElement>document.getElementById(elementId);
        L.DomEvent.disableClickPropagation(element);
        L.DomEvent.disableScrollPropagation(element);
    };

    getPerosonsAndGravesBySurname(surname: string) {
        let persons = this.api.get('/persons', { surname });
        let graves = this.api.get('/graves', { surname });

        Observable.forkJoin([persons, graves])
            .do(results => {
                this.storeHelper.update('personList', results[0])
                this.storeHelper.update('graves', results[1])
            })
            .subscribe((results => {
                this.graves = results[1];
                this.vtLayer.clearLayers();
                this.vtLayer.addData(this.graves).addTo(this.map);
                this.map.fitBounds(this.vtLayer.getBounds())
            }))
    }

    getSelectedGrave(person: any) {
        let graveId = person.numer;
        let findGrave = (feat) => feat.properties.numer === graveId
        let selectedGrave = this.graves.features.find(findGrave);
        this.addSelectedGrave(selectedGrave);
        let coords = this.selectedGrave
            .getBounds()
            .getCenter();

        this.getPersonsByCoords(coords)
    }

    addSelectedGrave(grave: any) {
        this.selectedGrave
            .clearLayers()
            .addData(grave)
            .setStyle(this.selectedStyle)
            .addTo(this.map);
        this.map.fitBounds(this.selectedGrave.getBounds())
        this.openPopup('personsByGrave')
    }

    
    openPopup(id: string){
        this.modalService.open(id);
    }

    getPersonsByCoords(coords: { lat, lng }) {
        let persons = this.api.get('/persons/grave', { lat: coords.lat, lng: coords.lng });
        let grave = this.api.get('/graves/select', { lat: coords.lat, lng: coords.lng });

        Observable.forkJoin([persons, grave])
            .subscribe(responses => {
                this.storeHelper.update('personsByGrave', responses[0])
                this.addSelectedGrave(responses[1])
            });
    }
}

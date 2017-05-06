import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MapService } from '../../services';
import { MarkerComponent, SearchComponent, SidebarComponent } from '../../components';

// Change the component because we want to store data in state not in the component directly
import { Store } from '../../store';

@Component({
    selector: 'map-container',
    styles: [
        require('./style.scss'),
        require('leaflet/dist/leaflet.css')
    ],
    template: require('./map.html')
})
export class MapContainer {
    private _opened: boolean = false;
    @ViewChild(MarkerComponent) markerComponent: MarkerComponent;
    @ViewChild(SearchComponent) searchComponent: SearchComponent;
    @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent;

    constructor(
        private mapService: MapService
    ) { }

    ngOnInit() {
        let map = L.map("map", {
            zoomControl: false,
            center: L.latLng(40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19,
            layers: [this.mapService.baseMaps.CartoDB]
        });

        map.on('click', (e: any) => {
            this.mapService.getPersonsByCoords(e.latlng)
        });

        L.control.zoom({ position: "topright" }).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;

        // this.geocoder.getCurrentLocation()
        //     .subscribe(
        //         location => map.panTo([location.latitude, location.longitude]),
        //         err => console.error(err)
        //     );

    }
    ngAfterViewInit() {
        this.markerComponent.Initialize();
    }

    togglePanelOpened() {
        this.sidebarComponent.toggleOpened();
    }
}
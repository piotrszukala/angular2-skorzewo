import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MapService } from '../../services';
import { MarkerComponent, SearchComponent } from '../../components';

// Change the component because we want to store data in state not in the component directly
import { Store } from '../../store';

@Component({
  selector: 'map-container',
  styles: [
    require('./style.scss'),
    require('leaflet/dist/leaflet.css')
  ],
  template: `
    <div class="top-map-menu">
      
      <marker></marker>
      <side-bar></side-bar>
    </div>  
    <div id="map"></div>
  `
})
export class MapContainer {
  @ViewChild(MarkerComponent) markerComponent: MarkerComponent;
  @ViewChild(SearchComponent) searchComponent: SearchComponent;

 constructor(
   private mapService: MapService
 ) {}

ngOnInit() {
        let map = L.map("map", {
            zoomControl: false,
            center: L.latLng(40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19,
            layers: [this.mapService.baseMaps.CartoDB]
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
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  imports: [CommonModule,LeafletModule],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss'
})

export class LeafletMapComponent {

  // First map options
  options1 = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 5,
    center: L.latLng(46.879966, -121.726909),
  };

  //Second map
  layersControl = {
    baseLayers: {
      'Open Street Map': L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }
      ),
      'Open Cycle Map': L.tileLayer(
        'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }
      ),
    },
    overlays: {
      'Big Circle': L.circle([46.95, -122], { radius: 5000 }),
      'Big Square': L.polygon([
        [46.8, -121.55],
        [46.9, -121.55],
        [46.9, -121.7],
        [46.8, -121.7],
      ]),
    },
  };

  options2 = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 50,
        attribution: '...',
      }),
    ],
    zoom: 5,
    center: L.latLng(46.879966, -121.726909),
  };

 //Third map
  map: L.Map;
  json: any;
  options3 = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '',
      }),
    ],
    zoom: 5,
    center: L.latLng(22.3511148, 78.6677428),
  };

  //Forth map
  map4: any;
  homeCoords = {
    lat: 23.810331,
    lon: 90.412521,
  };

  popupText = 'Some popup text';

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png',
    }),
  };

  options4 = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '',
      }),
    ],
    zoom: 5,
    center: L.latLng(this.homeCoords.lat, this.homeCoords.lon),
  };

  initMarkers() {
    const popupInfo = `<b style="color: red; background-color: white">${this.popupText}</b>`;
    L.marker([this.homeCoords.lat, this.homeCoords.lon], this.markerIcon)
      .addTo(this.map4)
      .bindPopup(popupInfo);
  }

  onMapReady4(map: L.Map) {
    this.map4 = map;
    this.initMarkers();
  }

  ngOnInit() {
    this.map = L.map('polygonMap', this.options3); // Or however you're initializing the map

    // Example polygon coordinates (triangle)
    const indiaPolygonCoords: L.LatLngExpression[] = [
      [35.65, 76.0],   // North
      [34.0, 78.0],
      [32.0, 80.0],
      [28.0, 81.0],
      [27.0, 88.0],    // East
      [24.0, 92.0],
      [22.0, 91.0],
      [21.0, 89.0],
      [20.0, 88.0],
      [17.0, 85.0],
      [15.0, 80.0],
      [12.0, 76.0],    // South
      [8.0, 77.5],
      [10.0, 72.0],
      [15.0, 70.0],
      [22.0, 68.0],
      [25.0, 70.0],    // West
      [28.0, 69.0],
      [30.0, 70.0],
      [32.0, 72.0],
      [34.0, 74.0],
      [35.65, 76.0],   // Back to North
    ];

    const indiaPolygon = L.polygon(indiaPolygonCoords, {
      color: 'green',
      fillColor: '#3f0',
      fillOpacity: 0.3,
    });

    indiaPolygon.bindPopup("India").addTo(this.map);
  }

}

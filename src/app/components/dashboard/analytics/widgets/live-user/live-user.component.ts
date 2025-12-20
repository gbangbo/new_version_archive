import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-live-user',
  imports: [CommonModule, CardComponent, LeafletModule, FeatherIconComponent],
  templateUrl: './live-user.component.html',
  styleUrl: './live-user.component.scss'
})

export class LiveUserComponent {

  public cardToggleOption = cardToggleOptions1;
  public map: L.Map;
  public markers: L.Marker[] = [];
  public customIcon: L.DivIcon;
  public options: L.MapOptions = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      }),
    ],
    zoom: 0,
    center: L.latLng(0, 0),
  };

  initMarkers() {
    const initialMarkers: any[] = [
      { name: "Algeria", lat: -14.235, lng: -51.9253, image: "assets/images/dashboard-10/location.png" },
      { name: "Chile", lat: 35.8617, lng: 104.1954, image: "assets/images/dashboard-10/location.png" },
      { name: "United Kingdom", lat: 55.3781, lng: 3.436, image: "assets/images/dashboard-10/location.png" },
      { name: "Egypt", lat: 26.8206, lng: 30.8025, image: "assets/images/dashboard-10/location.png" },
      { name: "United States", lat: 37.0902, lng: -95.7129, image: "assets/images/dashboard-10/location.png" },
      { name: "China", lat: 39.9042, lng: 116.4074, image: "assets/images/dashboard-10/location.png" },
      { name: "Botswana", lat: -22.3285, lng: 24.6849, image: "assets/images/dashboard-10/location.png" }
    ];

    initialMarkers.forEach((data, index) => {
      this.customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: "<div class='marker-pin'></div><img src='" + data.image + "' style='width: 50px; height: 50px;'>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });

      const marker = this.generateMarker(data.lat, data.lng, index, data.name);
      marker.addTo(this.map);

      this.map.panTo(new L.LatLng(data.lat, data.lng));

      this.markers.push(marker);
    });
  }

  generateMarker(lat: number, lng: number, index: number, name: string) {
    const marker = L.marker([lat, lng], {
      draggable: false,
      icon: this.customIcon
    });

    marker.bindTooltip(name, { permanent: false, direction: 'top' });

    return marker;
  }

  onMapReady($event: L.Map) {
    this.map = $event;
    this.initMarkers();
  }

}

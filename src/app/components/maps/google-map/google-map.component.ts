import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-google-map',
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss'
})

export class GoogleMapComponent {

  public asiaMapOptions: google.maps.MapOptions = {
    center: { lat: 47.5162, lng: 100.2167 },
    zoom: 3
  };

  public worldMapOption: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 2
  };

  public usaMapOptions: google.maps.MapOptions = {
    center: { lat: 37.0902, lng: -95.7129 },
    zoom: 4
  };

  public indiaMapOptions: google.maps.MapOptions = {
    center: { lat: 20.5937, lng: 78.9629 },
    zoom: 4
  };

  public markers: any[];
  public zoom: number;

  constructor() {
    
    this.markers = [];

    this.markers.push({
        position: {
          lat: 32.4279,
          lng: 53.6880
        },
        label: {
          color: "black",
          text: "Iran"
        },
      });

      this.markers.push({
        position: {
          lat: 33.9391,
          lng: 67.7100
        },
        label: {
          color: "black",
          text: "Afghanistan"
        },
      });

      this.markers.push({
        position: {
          lat: 23.0225,
          lng: 72.5714
        },
        label: {
          color: "black",
          text: "Ahmadabad"
        },
      });
  }

}

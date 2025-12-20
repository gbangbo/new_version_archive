import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  public sidebarOpen: boolean = false;
  public listView: boolean = false;
  public gridView: boolean = true;
  public grid_2: boolean = false;
  public grid_3: boolean = false;
  public grid_4: boolean = true;
  public grid_6: boolean = false;

  gridOpen() {
    this.gridView = true;
    this.grid_4 = true;
    this.grid_2 = false;
    this.grid_3 = false;
    this.grid_6 = false;
    this.listView = false;
  }

  listOpen() {
    this.listView = true;
    this.gridView = false;
    this.grid_2 = false;
    this.grid_3 = false;
    this.grid_4 = false;
    this.grid_6 = false;
  }

  grid2() {
    this.gridView = true;
    this.grid_2 = true;
    this.grid_3 = false;
    this.grid_4 = false;
    this.grid_6 = false;
    this.listView = false;
  }

  grid3() {
    this.gridView = true;
    this.grid_3 = true;
    this.grid_2 = false;
    this.grid_4 = false;
    this.grid_6 = false;
    this.listView = false;
  }

  grid4() {
    this.gridView = true;
    this.grid_4 = true;
    this.grid_2 = false;
    this.grid_3 = false;
    this.grid_6 = false;
    this.listView = false;
  }

  grid6() {
    this.gridView = false;
    this.grid_6 = true;
    this.grid_2 = false;
    this.grid_3 = false;
    this.grid_4 = false;
    this.listView = false;
  }
}

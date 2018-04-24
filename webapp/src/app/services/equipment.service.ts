import { Injectable } from '@angular/core';

import { Http,Headers } from '@angular/http';
import {Observable} from 'rxjs';
import { Equipment } from '../models/Equipment'

import 'rxjs/add/operator/map';

@Injectable()
export class EquipmentService {

  constructor(private http: Http) { }

  //private serverApi= 'http://localhost:4300';
  private serverApi= 'https://my-demo-app-assingment.eu-gb.mybluemix.net';

  public Equipments : Equipment[];
  public Equipment : Equipment;

  public getAllEquipment(limit):Observable<Equipment[]> {

    let URI = `${this.serverApi}/demoapp/equipment/search?limit=${limit}`;
    return this.http.get(URI)
        .map(res => res.json())
        .map(res => <Equipment[]>res);
  }
  
  public searchEquipment(value):Observable<Equipment> {

    let URI = `${this.serverApi}/demoapp/equipment/${value}`;
    return this.http.get(URI)
        .map(res => res.json())
        .map(res => <Equipment>res);
  }

  public addEquipment(data):Observable<string> {
    let URI = `${this.serverApi}/demoapp/equipment`;
    return this.http.post(URI, data)
        .map(res => res.json())
        .map(res => <string>res);
  }

}

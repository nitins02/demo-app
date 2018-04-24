import { Component, OnInit } from '@angular/core';

import { EquipmentService } from '../services/equipment.service';
import { Equipment } from '../models/Equipment';
import { Response } from '../models/Response';

@Component({
  selector: 'app-view-equipment',
  templateUrl: './view-equipment.component.html',
  styleUrls: ['./view-equipment.component.css']
})
export class ViewEquipmentComponent implements OnInit {

  equipmentList: Equipment[] = [];
  equip: Equipment;
  limits: string[] = ['1', '5', '10', '20'];
  selectedDeviceObj: string;
  message: string;

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit() {
    this.clearData();
    this.loadLists();
  }

  public clearData(){
    this.equip = {
      equipmentNumber: '',
      address: '',
      startDate: '',
      endDate: '',
      status: 'Running'
    }
  }

  public loadLists() {
    console.log("Get All Equipment")
    this.selectedDeviceObj = this.limits[1];
    this.equipmentService.getAllEquipment(this.selectedDeviceObj).subscribe(
      response => {
        console.log("Respnose ", response);
        this.equipmentList = response
      });
    
  }

  public onChange(limit) {
    console.log("onChange >>>");
    this.message = "";
    this.equipmentService.getAllEquipment(limit).subscribe(
      response => {
        this.equipmentList = response
      });
  } 

  public search(value) {
    console.log("Search >>>")
    this.message = "";
    this.equipmentService.searchEquipment(value).subscribe(
      response => {
        this.equipmentList = [];
        this.equipmentList.push(response);
      }); 
  } 

  public addEquipment() {
    console.log("addEquipment >>>");
    this.message = "";
    console.log("----this.equip ", this.equip );
    this.equipmentService.addEquipment(this.equip).subscribe(
      response => {
        console.log("Respnose ", response);
        if(response["statusCode"] == 200){
          this.message = response["message"];
          this.equipmentService.getAllEquipment(this.selectedDeviceObj).subscribe(
            response => {
              this.equipmentList = response;
              this.clearData();
            });
        }else{
          this.message = response["message"];
        }
      });
  }
}

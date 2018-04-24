import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { ViewEquipmentComponent } from './view-equipment/view-equipment.component';

import { EquipmentService } from './services/equipment.service';

@NgModule({
  declarations: [
    AppComponent,
    ViewEquipmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [EquipmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {FormsModule} from "@angular/forms";
import {AppComponent} from "../app.component";



@NgModule({
  declarations: [
    SearchBarComponent
  ],
  exports: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class MenuModule { }

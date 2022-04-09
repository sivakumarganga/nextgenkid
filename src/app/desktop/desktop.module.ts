import { NgModule } from "@angular/core";
import { DesktopComponent } from './desktop.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from "@angular/common";


@NgModule({
imports:[CommonModule,SharedModule],
declarations:[
    DesktopComponent
  ]
})
export class DesktopModule{

}
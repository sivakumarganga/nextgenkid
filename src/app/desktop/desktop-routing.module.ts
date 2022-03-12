import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { DesktopComponent } from "./desktop.component";

const routes:Routes=[
{
    path:'desktop',
    component:DesktopComponent
}

];

@NgModule({
    imports:[CommonModule,RouterModule.forChild(routes)],
    declarations:[],
    exports:[RouterModule]
})
export class DesktopRoutingModule{

}
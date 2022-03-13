import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AlphabetAppComponent } from "./alphabet-app/alphabet-app.component";
import { NumbsAppComponent } from "./numbs-app/numbs-app.component";
import { DrumsAppComponent } from "./drums-app/drums-app.component";
const routes:Routes=[
    {
        path:"apps",
        children:[
            {
                path:'alphabet',
                component:AlphabetAppComponent
            },{
                path:'numbs',
                component:NumbsAppComponent
            },{
                path:'drums',
                component:DrumsAppComponent
            }
        ]

    }
];

@NgModule({
    imports:[CommonModule,RouterModule.forChild(routes)],
    declarations:[],
    exports:[RouterModule]
})
export class AppsRoutingModule{

}
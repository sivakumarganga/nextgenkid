import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AlphabetAppComponent } from "./alphabet-app/alphabet-app.component";
import { NumbsAppComponent } from "./numbs-app/numbs-app.component";
import { DrumsAppComponent } from "./drums-app/drums-app.component";
import { SketchpadComponent } from "./sketchpad/sketchpad.component";
import { SmashComponent } from "./smash/smash.component";
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
            },
            {
                path:'sketchpad',
                component:SketchpadComponent
            },
            {
                path:'smash',
                component:SmashComponent
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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphabetAppComponent } from './alphabet-app/alphabet-app.component';
import { AppsRoutingModule } from './apps-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NumbsAppComponent } from './numbs-app/numbs-app.component';
import { DrumsAppComponent } from './drums-app/drums-app.component';

@NgModule({
  declarations: [
    AlphabetAppComponent,
    NumbsAppComponent,
    DrumsAppComponent
  ],
  imports: [
    CommonModule, SharedModule, AppsRoutingModule
  ]
})
export class AppsModule { }

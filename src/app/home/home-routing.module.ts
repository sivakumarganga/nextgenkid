import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DrumsComponent } from './drums.component';

const routes: Routes = [
  {
    path: 'home',
    component: DrumsComponent
  },{
    path:'drums',
    component:DrumsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

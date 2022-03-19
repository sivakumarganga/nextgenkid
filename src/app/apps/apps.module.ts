import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphabetAppComponent } from './alphabet-app/alphabet-app.component';
import { AppsRoutingModule } from './apps-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NumbsAppComponent } from './numbs-app/numbs-app.component';
import { DrumsAppComponent } from './drums-app/drums-app.component';
import { SketchpadComponent } from './sketchpad/sketchpad.component';
import { ColorPanelComponent } from './sketchpad/components/color-panel';
import { CanvasComponent } from './sketchpad/components/canvas';
import { GalleryComponent } from './sketchpad/components/gallery';
import { SmashComponent } from './smash/smash.component';
import { VideoDestructionComponent } from './video-destruction/video-destruction.component';
import { BallonsPopComponent } from './ballons-pop/ballons-pop.component';

@NgModule({
  declarations: [
    AlphabetAppComponent,
    NumbsAppComponent,
    DrumsAppComponent,
    SketchpadComponent,
    ColorPanelComponent,
    CanvasComponent,
    GalleryComponent,
    SmashComponent,
    VideoDestructionComponent,
    BallonsPopComponent
  ],
  imports: [
    CommonModule, SharedModule, AppsRoutingModule
  ]
})
export class AppsModule { }

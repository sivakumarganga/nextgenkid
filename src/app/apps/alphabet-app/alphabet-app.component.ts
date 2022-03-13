import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alphabet-app',
  templateUrl: './alphabet-app.component.html',
  styleUrls: ['./alphabet-app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabetAppComponent implements OnInit {

  constructor(public ref: ChangeDetectorRef) {

  }

 ngOnInit() {

 }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechService } from '../core/services';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  constructor(private router: Router,private speechService:SpeechService) { }

  ngOnInit(): void {
    this.speechService.speak("Hello!,  Smart Kidoo!")
  }

}

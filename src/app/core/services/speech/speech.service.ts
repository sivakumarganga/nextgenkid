import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  constructor() { }
  public speak = (sentence: string) => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = sentence;
    window.speechSynthesis.speak(msg);
  }
  public stop = () => {
    window.speechSynthesis.cancel();
  }
  public isSpeaking(){
    return window.speechSynthesis.speaking;
  }
}

import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-drums',
    templateUrl: './drums.component.html',
    styleUrls: ['./drums.component.scss']
})
export class DrumsComponent implements OnInit {
    private handleKeyBind: { () };
    private audioFiles: Array<any> = [
        { key: 65, keyChar: "A", src: "/./assets/sounds/clap.wav", sound: "clap" },
        { key: 83, keyChar: "S", src: "/./assets/sounds/hihat.wav", sound: "hihat" },
        { key: 68, keyChar: "D", src: "/./assets/sounds/kick.wav", sound: "kick" },
        { key: 70, keyChar: "F", src: "/./assets/sounds/openhat.wav", sound: "openhat" },
        { key: 71, keyChar: "G", src: "/./assets/sounds/boom.wav", sound: "boom" },
        { key: 72, keyChar: "H", src: "/./assets/sounds/ride.wav", sound: "ride" },
        { key: 74, keyChar: "J", src: "/./assets/sounds/snare.wav", sound: "snare" },
        { key: 75, keyChar: "K", src: "/./assets/sounds/tom.wav", sound: "tom" },
        { key: 76, keyChar: "L", src: "/./assets/sounds/tink.wav", sound: "tink" }
    ];
    private playingTitle = "Press A Key To Play The Drums";
    constructor() {
        this.handleKeyBind = this.handleKey.bind(this);
        document.addEventListener('keyup', this.handleKeyBind, false);
    }
    public playingList: any = {};

    ngOnInit(): void {

    }
    private playSound(e: any) {
        var audioFile = this.audioFiles.find(_ => _.key === e.keyCode);
        if (audioFile) {
            this.playingList[e.keyCode] = true;
            const audio = new Audio(audioFile.src);
            this.playingTitle = audioFile.keyChar;
            audio.play().then(_ => {
                setTimeout(() => {
                    this.playingList[e.keyCode] = false;
                }, 500);

            });
        }
    }
    private amIPlaying(keyCode) {
        return this.playingList[keyCode];
    }

    private handleKey(event: any) {
        this.playSound(event);
    }

    onDestroy() {
        document.removeEventListener('keydown', this.handleKeyBind, false);
    }
}
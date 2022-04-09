import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Models
import { Color } from '../../models/color';

@Component({
  selector: 'app-color-panel',
  templateUrl: './color-panel.component.html',
  styleUrls: ['./color-panel.component.scss']
})
export class ColorPanelComponent implements OnInit {
  @Output() currentColor: EventEmitter<string> = new EventEmitter<string>();
  @Output() currentRange: EventEmitter<number> = new EventEmitter<number>();

  public colors: Array<Color>;
  private black:  Color;
  private white: Color;
  private grey: Color;
  private red: Color;
  private yellow: Color;
  private green: Color;
  private blue: Color;
  public range: number;

  constructor() {
    this.black = {hexValue: "#000", current: false};
    this.white = {hexValue: "#fff", current: false};
    this.grey = {hexValue: "#848284", current: false};
    this.red = {hexValue: "#f00", current: false};
    this.yellow = {hexValue: "#f0ff00", current: false};
    this.green = {hexValue: "#009c22", current: false};
    this.blue = {hexValue: "#0f92e1", current: false};

    this.colors = [this.black, this.white, this.grey, this.red, this.yellow, this.green, this.blue];
  }
  ngOnInit() {
    this.range = 5;
    this.currentColor.emit(this.black.hexValue);
    this.black.current = true;
    this.currentRange.emit(this.range);
  }

  changeColor(c) {
    this.currentColor.emit(c.hexValue);
    this.colors.forEach((color: Color) => color.current = false);
    const idx = this.colors.indexOf(c);
    this.colors[idx].current = true;
  }

  rangeChange() {
    this.currentRange.emit(this.range);
  }
}

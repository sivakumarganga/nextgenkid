import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @ViewChild("galleryImages") images: ElementRef;


  constructor() { }

  ngOnInit() {
  }

  addImageToGallery(img) {
    this.images.nativeElement.appendChild(img);
  }
}

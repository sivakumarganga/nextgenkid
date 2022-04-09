import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDestructionComponent } from './video-destruction.component';

describe('VideoDestructionComponent', () => {
  let component: VideoDestructionComponent;
  let fixture: ComponentFixture<VideoDestructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoDestructionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDestructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

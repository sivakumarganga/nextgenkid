import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallonsPopComponent } from './balloons-pop.component';

describe('BallonsPopComponent', () => {
  let component: BallonsPopComponent;
  let fixture: ComponentFixture<BallonsPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallonsPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallonsPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

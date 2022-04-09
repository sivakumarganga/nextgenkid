import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmashComponent } from './smash.component';

describe('SmashComponent', () => {
  let component: SmashComponent;
  let fixture: ComponentFixture<SmashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

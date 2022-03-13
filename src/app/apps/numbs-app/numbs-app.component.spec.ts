import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbsAppComponent } from './numbs-app.component';

describe('NumbsAppComponent', () => {
  let component: NumbsAppComponent;
  let fixture: ComponentFixture<NumbsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumbsAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

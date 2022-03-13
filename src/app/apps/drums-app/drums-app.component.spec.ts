import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrumsAppComponent } from './drums-app.component';

describe('DrumsAppComponent', () => {
  let component: DrumsAppComponent;
  let fixture: ComponentFixture<DrumsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrumsAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrumsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

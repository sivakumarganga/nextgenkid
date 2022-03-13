import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetAppComponent } from './alphabet-app.component';

describe('AlphabetAppComponent', () => {
  let component: AlphabetAppComponent;
  let fixture: ComponentFixture<AlphabetAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlphabetAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabetAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

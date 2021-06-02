import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenIdAddComponent } from './screen-id-add.component';

describe('ScreenIdAddComponent', () => {
  let component: ScreenIdAddComponent;
  let fixture: ComponentFixture<ScreenIdAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenIdAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenIdAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

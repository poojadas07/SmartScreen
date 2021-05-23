import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreensAddComponent } from './screens-add.component';

describe('ScreensAddComponent', () => {
  let component: ScreensAddComponent;
  let fixture: ComponentFixture<ScreensAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreensAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreensAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

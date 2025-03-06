import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificDateTimezoneComponent } from './specific-date-timezone.component';

describe('SpecificDateTimezoneComponent', () => {
  let component: SpecificDateTimezoneComponent;
  let fixture: ComponentFixture<SpecificDateTimezoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificDateTimezoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificDateTimezoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

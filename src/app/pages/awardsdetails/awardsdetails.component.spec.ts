import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsdetailsComponent } from './awardsdetails.component';

describe('AwardsdetailsComponent', () => {
  let component: AwardsdetailsComponent;
  let fixture: ComponentFixture<AwardsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwardsdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

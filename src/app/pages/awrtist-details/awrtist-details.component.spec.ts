import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwrtistDetailsComponent } from './awrtist-details.component';

describe('AwrtistDetailsComponent', () => {
  let component: AwrtistDetailsComponent;
  let fixture: ComponentFixture<AwrtistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwrtistDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwrtistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

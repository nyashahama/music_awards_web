import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteConfirmationComponent } from './vote-confirmation.component';

describe('VoteConfirmationComponent', () => {
  let component: VoteConfirmationComponent;
  let fixture: ComponentFixture<VoteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

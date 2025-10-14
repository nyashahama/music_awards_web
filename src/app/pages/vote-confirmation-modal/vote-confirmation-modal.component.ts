import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vote-confirmation-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vote-confirmation-modal.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class VoteConfirmationModalComponent {
  @Input() success: boolean = true;
  @Input() categoryName: string = '';
  @Input() nomineeName: string = '';
  @Input() nomineeImage: string = '';
  @Input() errorMessage: string = 'Unable to submit your vote. Please try again.';

  @Output() close = new EventEmitter<void>();
  @Output() continueVoting = new EventEmitter<void>();
  @Output() retry = new EventEmitter<void>();

  onBackdropClick(event: Event): void {
    this.close.emit();
  }

  onContinueVoting(): void {
    this.continueVoting.emit();
  }

  onRetry(): void {
    this.retry.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}

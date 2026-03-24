import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'cancel()'
  }
})
export class DeleteModalComponent {
  readonly confirmed = output<void>();
  readonly cancelled = output<void>();

  confirm(): void {
    this.confirmed.emit();
  }

  cancel(): void {
    this.cancelled.emit();
  }
}


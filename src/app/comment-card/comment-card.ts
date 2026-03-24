import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { startWith } from 'rxjs';
import { type CommentNode } from '../interfaces/comment.interface';

@Component({
  selector: 'app-comment-card',
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'cancelEditing()'
  }
})
export class CommentCardComponent {
  readonly comment = input.required<CommentNode>();
  readonly currentUsername = input.required<string>();
  readonly replyRequested = output<void>();
  readonly upvoteRequested = output<void>();
  readonly downvoteRequested = output<void>();
  readonly deleteRequested = output<void>();
  readonly updateRequested = output<string>();

  readonly editControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(500)]
  });

  readonly avatarWebpSrc = computed(() => this.comment().user.image.webp);
  readonly avatarPngSrc = computed(() => this.comment().user.image.png);
  readonly avatarAlt = computed(() => `Avatar of ${this.comment().user.username}`);
  readonly scoreLabel = computed(() => `Current score ${this.comment().score}`);
  readonly replyingTo = computed(() => {
    const comment = this.comment();

    return 'replyingTo' in comment ? comment.replyingTo : undefined;
  });
  readonly isCurrentUser = computed(() => this.comment().user.username === this.currentUsername());
  readonly replyButtonLabel = computed(() => `Reply to ${this.comment().user.username}`);
  readonly upvoteButtonLabel = computed(() => `Increase score for ${this.comment().user.username}`);
  readonly downvoteButtonLabel = computed(() => `Decrease score for ${this.comment().user.username}`);
  readonly isEditing = signal(false);
  readonly editActionLabel = computed(() => (this.isEditing() ? 'Cancel' : 'Edit'));
  readonly editActionAriaLabel = computed(() =>
    this.isEditing() ? 'Cancel comment editing' : 'Edit comment'
  );
  readonly editControlValue = toSignal(
    this.editControl.valueChanges.pipe(startWith(this.editControl.value)),
    { initialValue: this.editControl.value }
  );
  readonly editControlStatus = toSignal(
    this.editControl.statusChanges.pipe(startWith(this.editControl.status)),
    { initialValue: this.editControl.status }
  );
  readonly canSubmitUpdate = computed(() => {
    const content = this.editControlValue().trim();

    return this.editControlStatus() === 'VALID' && content.length > 0 && content !== this.comment().content;
  });
  readonly editErrorMessage = computed(() => {
    this.editControlValue();
    this.editControlStatus();

    if (!this.showEditValidation()) {
      return null;
    }

    if (this.editControl.hasError('required')) {
      return 'Comment content cannot be empty.';
    }

    if (this.editControl.hasError('maxlength')) {
      return 'Comment content must be 500 characters or less.';
    }

    return 'Please provide a valid comment.';
  });
  readonly editTextarea = viewChild<ElementRef<HTMLTextAreaElement>>('editTextarea');
  readonly editTrigger = viewChild<ElementRef<HTMLButtonElement>>('editTrigger');
  private readonly shouldRestoreEditFocus = signal(false);
  private readonly showEditValidation = signal(false);

  constructor() {
    effect(() => {
      if (this.isEditing()) {
        const textarea = this.editTextarea();

        if (textarea !== undefined) {
          textarea.nativeElement.focus();
        }

        return;
      }

      if (!this.shouldRestoreEditFocus()) {
        return;
      }

      const editButton = this.editTrigger();

      if (editButton !== undefined) {
        editButton.nativeElement.focus();
      }

      this.shouldRestoreEditFocus.set(false);
    });
  }

  startEditing(): void {
    if (!this.isCurrentUser() || this.isEditing()) {
      return;
    }

    this.editControl.setValue(this.comment().content);
    this.editControl.markAsUntouched();
    this.showEditValidation.set(false);
    this.isEditing.set(true);
  }

  toggleEditing(): void {
    if (this.isEditing()) {
      this.cancelEditing();
      return;
    }

    this.startEditing();
  }

  cancelEditing(): void {
    if (!this.isEditing()) {
      return;
    }

    this.isEditing.set(false);
    this.showEditValidation.set(false);
    this.shouldRestoreEditFocus.set(true);
  }

  submitUpdate(): void {
    if (!this.canSubmitUpdate()) {
      this.showEditValidation.set(true);

      if (this.editControlValue().trim() === this.comment().content) {
        this.cancelEditing();
      }

      return;
    }

    const content = this.editControlValue().trim();

    this.updateRequested.emit(content);
    this.cancelEditing();
  }

  requestReply(): void {
    this.replyRequested.emit();
  }

  requestUpvote(): void {
    this.upvoteRequested.emit();
  }

  requestDownvote(): void {
    this.downvoteRequested.emit();
  }

  requestDelete(): void {
    this.deleteRequested.emit();
  }
}



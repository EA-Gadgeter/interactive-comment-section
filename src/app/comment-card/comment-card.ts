import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { type CommentNode } from '../interfaces/comment.interface';

@Component({
  selector: 'app-comment-card',
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
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

  readonly avatarWebpSrc = computed(() => this.comment().user.image.webp.replace('./', '/'));
  readonly avatarPngSrc = computed(() => this.comment().user.image.png.replace('./', '/'));
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

  startEditing(): void {
    this.editControl.setValue(this.comment().content);
    this.isEditing.set(true);
  }

  submitUpdate(): void {
    const content = this.editControl.value.trim();

    if (content.length === 0) {
      this.editControl.markAsTouched();
      return;
    }

    if (content === this.comment().content) {
      this.isEditing.set(false);
      return;
    }

    this.updateRequested.emit(content);
    this.isEditing.set(false);
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



import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { type User } from '../interfaces/comment.interface';

@Component({
  selector: 'app-comment-box',
  imports: [ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './comment-box.html',
  styleUrl: './comment-box.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentBoxComponent {
  readonly currentUser = input.required<User>();
  readonly submitLabel = input('SEND');
  readonly placeholder = input('Add a comment...');
  readonly showCancel = input(false);

  readonly submitted = output<string>();
  readonly cancelled = output<void>();

  readonly form = new FormGroup({
    content: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)]
    })
  });

  readonly avatarWebpSrc = computed(() => this.currentUser().image.webp);
  readonly avatarPngSrc = computed(() => this.currentUser().image.png);
  readonly avatarAlt = computed(() => `Avatar of ${this.currentUser().username}`);

  submit(): void {
    const rawValue = this.form.controls.content.value;
    const content = rawValue.trim();

    if (content.length === 0) {
      this.form.controls.content.markAsTouched();
      return;
    }

    this.submitted.emit(content);
    this.form.reset({ content: '' });
  }

  cancel(): void {
    this.form.reset({ content: '' });
    this.cancelled.emit();
  }
}


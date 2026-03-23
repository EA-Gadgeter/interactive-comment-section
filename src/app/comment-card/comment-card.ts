import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { type CommentNode } from '../interfaces/comment.interface';

@Component({
  selector: 'app-comment-card',
  imports: [NgOptimizedImage],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentCardComponent {
  readonly comment = input.required<CommentNode>();
  readonly currentUsername = input.required<string>();

  readonly avatarWebpSrc = computed(() => this.comment().user.image.webp.replace('./', '/'));
  readonly avatarPngSrc = computed(() => this.comment().user.image.png.replace('./', '/'));
  readonly avatarAlt = computed(() => `Avatar of ${this.comment().user.username}`);
  readonly scoreLabel = computed(() => `Current score ${this.comment().score}`);
  readonly replyingTo = computed(() => {
    const comment = this.comment();

    return 'replyingTo' in comment ? comment.replyingTo : undefined;
  });
  readonly isCurrentUser = computed(() => this.comment().user.username === this.currentUsername());
}



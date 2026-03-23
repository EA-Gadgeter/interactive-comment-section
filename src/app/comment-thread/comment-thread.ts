import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { CommentBoxComponent } from '../comment-box/comment-box';
import { CommentCardComponent } from '../comment-card/comment-card';
import { type Comment, type NewReplyInput, type User } from '../interfaces/comment.interface';

type ReplyTarget = {
  commentId: number;
  replyingTo: string;
};

@Component({
  selector: 'app-comment-thread',
  imports: [CommentCardComponent, CommentBoxComponent],
  templateUrl: './comment-thread.html',
  styleUrl: './comment-thread.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentThreadComponent {
  readonly comments = input.required<readonly Comment[]>();
  readonly currentUser = input.required<User>();
  readonly currentUsername = input.required<string>();

  readonly commentCreated = output<string>();
  readonly replyCreated = output<NewReplyInput>();

  readonly replyTarget = signal<ReplyTarget | null>(null);

  openReplyBox(commentId: number, replyingTo: string): void {
    this.replyTarget.set({ commentId, replyingTo });
  }

  closeReplyBox(): void {
    this.replyTarget.set(null);
  }

  submitComment(content: string): void {
    this.commentCreated.emit(content);
  }

  submitReply(content: string): void {
    const target = this.replyTarget();

    if (target === null) {
      return;
    }

    this.replyCreated.emit({
      commentId: target.commentId,
      replyingTo: target.replyingTo,
      content
    });

    this.closeReplyBox();
  }
}


import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommentCardComponent } from '../comment-card/comment-card';
import { type Comment } from '../interfaces/comment.interface';

@Component({
  selector: 'app-comment-thread',
  imports: [CommentCardComponent],
  templateUrl: './comment-thread.html',
  styleUrl: './comment-thread.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentThreadComponent {
  readonly comments = input.required<readonly Comment[]>();
  readonly currentUsername = input.required<string>();
}


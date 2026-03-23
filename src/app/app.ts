import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommentThreadComponent } from './comment-thread/comment-thread';
import { CommentsDataService } from './services/comments-data.service';

@Component({
  selector: 'app-root',
  imports: [CommentThreadComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly commentsDataService = inject(CommentsDataService);

  readonly currentUsername = computed(() => this.commentsDataService.currentUsername());
  readonly comments = computed(() => this.commentsDataService.comments());
}

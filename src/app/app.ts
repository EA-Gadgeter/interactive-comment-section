import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommentThreadComponent } from './comment-thread/comment-thread';
import { DeleteModalComponent } from './delete-modal/delete-modal';
import {
  type DeleteTarget,
  type NewReplyInput,
  type UpdateContentInput,
  type VoteTarget
} from './interfaces/comment.interface';
import { CommentsDataService } from './services/comments-data.service';

@Component({
  selector: 'app-root',
  imports: [CommentThreadComponent, DeleteModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly commentsDataService = inject(CommentsDataService);
  readonly pendingDeleteTarget = signal<DeleteTarget | null>(null);

  readonly currentUser = computed(() => this.commentsDataService.currentUser());
  readonly currentUsername = computed(() => this.commentsDataService.currentUsername());
  readonly comments = computed(() => this.commentsDataService.comments());

  createComment(content: string): void {
    this.commentsDataService.addComment({ content });
  }

  createReply(input: NewReplyInput): void {
    this.commentsDataService.addReply(input);
  }

  upvote(target: VoteTarget): void {
    this.commentsDataService.upvote(target);
  }

  downvote(target: VoteTarget): void {
    this.commentsDataService.downvote(target);
  }

  updateContent(input: UpdateContentInput): void {
    this.commentsDataService.updateNodeContent(input);
  }

  openDeleteModal(target: DeleteTarget): void {
    this.pendingDeleteTarget.set(target);
  }

  closeDeleteModal(): void {
    this.pendingDeleteTarget.set(null);
  }

  confirmDelete(): void {
    const target = this.pendingDeleteTarget();

    if (target === null) {
      return;
    }

    this.commentsDataService.deleteNode(target);
    this.closeDeleteModal();
  }
}

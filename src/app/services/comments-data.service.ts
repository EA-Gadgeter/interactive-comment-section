import { Injectable, computed, signal } from '@angular/core';
import mockData from '../mock/data.json';
import {
  type Comment,
  type MockData,
  type NewCommentInput,
  type NewReplyInput,
  type Reply,
  type User
} from '../interfaces/comment.interface';

const initialData = mockData as MockData;

function getInitialNextId(comments: readonly Comment[]): number {
  const ids = comments.flatMap((comment) => [comment.id, ...comment.replies.map((reply) => reply.id)]);
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;

  return maxId + 1;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsDataService {
  readonly currentUser = signal<User>(initialData.currentUser);
  readonly currentUsername = computed(() => this.currentUser().username);
  readonly comments = signal<readonly Comment[]>(initialData.comments);

  private readonly nextId = signal(getInitialNextId(initialData.comments));

  addComment(input: NewCommentInput): void {
    const content = input.content.trim();

    if (content.length === 0) {
      return;
    }

    const newComment: Comment = {
      id: this.getNextId(),
      content,
      createdAt: 'Just now',
      score: 0,
      user: this.currentUser(),
      replies: []
    };

    this.comments.update((comments) => [...comments, newComment]);
  }

  addReply(input: NewReplyInput): void {
    const content = input.content.trim();

    if (content.length === 0) {
      return;
    }

    const newReply: Reply = {
      id: this.getNextId(),
      content,
      createdAt: 'Just now',
      score: 0,
      replyingTo: input.replyingTo,
      user: this.currentUser()
    };

    this.comments.update((comments) =>
      comments.map((comment) =>
        comment.id === input.commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
  }

  private getNextId(): number {
    const next = this.nextId();

    this.nextId.update((value) => value + 1);

    return next;
  }
}


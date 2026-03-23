import { Injectable, computed, signal } from '@angular/core';
import mockData from '../mock/data.json';
import { type Comment, type MockData, type User } from '../interfaces/comment.interface';

const initialData = mockData as MockData;

@Injectable({
  providedIn: 'root'
})
export class CommentsDataService {
  readonly currentUser = signal<User>(initialData.currentUser);
  readonly currentUsername = computed(() => this.currentUser().username);
  readonly comments = signal<readonly Comment[]>(initialData.comments);
}


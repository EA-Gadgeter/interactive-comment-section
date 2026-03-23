export interface UserImage {
  png: string;
  webp: string;
}

export interface User {
  username: string;
  image: UserImage;
}

export interface BaseComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
}

export interface Reply extends BaseComment {
  replyingTo: string;
}

export interface Comment extends BaseComment {
  replies: Reply[];
}

export interface MockData {
  currentUser: User;
  comments: Comment[];
}

export type CommentNode = Comment | Reply;



export interface Comment {
  commentId: number;
  postId: number;
  content: string;
  createdAt: Date;
  isEditing?: boolean;
}

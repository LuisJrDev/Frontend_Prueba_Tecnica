import { Post } from "./post.model";

export interface Category {
  categoryId: number;
  name: string;
  isActive: boolean;
}

export interface Comment {
  commentId: number;
  postId: number;
  content: string;
  createdAt: Date;
  isEditing?: boolean;
}

export interface PostDetalles extends Post {
  categorias: Category[];
  comentarios: Comment[];
}

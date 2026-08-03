import { Timestamp } from 'firebase/firestore';

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  author: string;
  authorId: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  status: 'published' | 'draft';
}

export interface BlogComment {
  id?: string;
  blogId: string;
  authorName: string;
  content: string;
  createdAt: Timestamp | Date;
}

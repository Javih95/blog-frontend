export interface PostType {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
    author: string;
    coverImage?: string;
    tags?: string[];
    destacado?: boolean;
}
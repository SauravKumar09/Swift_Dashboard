export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website?: string;
    [key: string]: any;
}

export interface CommentItem {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
    phone: string;
}
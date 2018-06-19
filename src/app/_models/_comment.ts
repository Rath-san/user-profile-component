export class Comment {

    userId: number;
    authorId: number;
    id: number;
    publishDate: number;
    content: string;

    constructor(
        userId: number,
        authorId: number,
        id: number,
        publishDate: number,
        content: string
    ) {
        this.userId = userId;
        this.authorId = authorId;
        this.id = id;
        this.publishDate = publishDate;
        this.content = content;
    }
}

export class Like {
    userId: number;
    likes: number[];
    liked: number[];

    constructor(
        userId: number,
        likes: number[],
        liked: number[]
    ) {
        this.userId = userId;
        this.likes = likes;
        this.liked = liked;
    }
}

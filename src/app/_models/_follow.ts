export class Follow {
    userId: number;
    follows: number[];
    following: number[];

    constructor(
        userId: number,
        follows: number[],
        following: number[],
    ) {
        this.userId = userId;
        this.follows = follows;
        this.following = following;
    }
}

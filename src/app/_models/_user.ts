export class User {

    id: number;
    firstName: string;
    lastName: string;
    location: string;
    avatar: string;
    webpage: string;

    // likes: number[];
    // following: number[];
    // followers: number[];
    // comments: Object[];

    constructor(
        id: number,
        first_name: string,
        last_name: string,
        location: string,
        avatar: string,
        webpage: string,

        // likes: number[],
        // following: number[],
        // followers: number[],
        // comments: Object[]
    ) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.location = location;
        this.avatar = avatar;
        this.webpage = webpage;

        // this.likes = likes;
        // this.following = following;
        // this.followers = followers;
        // this.comments = comments;
    }
}

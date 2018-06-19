import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input } from '@angular/core';
import { User } from '../_models/_user';
import { Comment } from '../_models/_comment';
import { DataService } from '../_services/data.service';
import { filter, map } from 'rxjs/operators';
import { Like } from '../_models/_like';
import { markParentViewsForCheckProjectedViews } from '@angular/core/src/view/util';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class UserProfileComponent implements OnInit {

  @ViewChild('commentInput') commentInput: ElementRef;
  @ViewChild('commentInputLabel') commentInputLabel: ElementRef;
  @ViewChild('commentsBody') commentsBody: ElementRef;

  @Input() userProfileId: number;
  @Input() loggedUserId: number;

  public loggedInUser: number;
  public popupShare = false;

  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _location: string;
  private _avatar: string;
  private _webpage: string;

  private _likes: number[];
  private _following: number[];
  private _followers: number[];
  private _comments: any;

  following: boolean;
  liking: boolean;

  commentsVisible: boolean;

  constructor(
    private _dataService: DataService,
  ) { }

  ngOnInit() {
    this._dataService.getData();
    this._id = Number(this.userProfileId);
    this.loggedInUser = Number(this.loggedUserId);

    this._dataService.users$
      .pipe(
        map((users: User[]) => {
          return users.filter((user: User) => user.id === this._id);
        })
      ).subscribe((user: User[]) => {
        this._firstName = user[0].firstName;
        this._lastName = user[0].lastName;
        this._location = user[0].location;
        this._avatar = user[0].avatar;
        this._webpage = document.URL;
      });


    this._dataService.comments$
      .pipe(
        map((comments: Comment[]) => {
          return comments.filter((comment: Comment) => comment.userId === this._id);
        })
      )
      .subscribe(comments => {
        this._comments = comments;
        this._sortCommentsByTime();
      });

    this._dataService.follow$
      .pipe(
        map((follow: any[]) => {
          return follow.filter((f: any) => f.userId === this._id);
        })
      )
      .subscribe((follow: any) => {
        this._followers = follow[0].following;
        this._following = follow[0].follows;
        this._checkIfFollowing();
      });

    this._dataService.likes$
      .pipe(
        map((likes: Like[]) => {
          return likes.filter((like: Like) => {
            return like.userId === this._id;
          });
        })
      )
      .subscribe((likes: Like[]) => {
        this._likes = likes[0].liked;
        this._checkIfLikes();
      });

    this.commentsVisible = true;

  }

  // data

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._firstName;
  }

  get surname(): string {
    return this._lastName;
  }

  get location(): string {
    return this._location;
  }

  get avatar(): string {
    return this._avatar;
  }

  get webpageUrl() {
    return this._webpage;
  }

  get comments() {
    //  if there are comments returns comments
    if (this._comments) {
      return this._comments;
    }
  }

  commentAuthor(id) {
    // returns author of comment
    return this._dataService.getUser(id);
  }

  get commentsLength() {
    // if there are comments returns comments length
    if (this._comments) {
      return this._comments.length;
    }
  }

  get likes() {
    // likes of user
    if (this._likes) {
      return this._likes.length;
    }
  }

  get followers() {
    // users that follow user
    if (this._followers) {
      return this._followers.length;
    }
  }

  get follows() {
    // what users follows user
    if (this._following) {
      return this._following.length;
    }
  }

  // actions
  togglePopupShare() {
    // toggles :boolean of popupShare
    this.popupShare = !this.popupShare;
  }

  follow(): void {
    //  adds/removes logged user id to followers array of this users profile
    if (this.following) {
      this._removeEntry(this._followers, this.loggedInUser);
    } else {
      this._followers.push(this.loggedInUser);
    }
    this._checkIfFollowing();
  }

  private _checkIfFollowing() {
    this.following = this._followers.includes(this.loggedInUser);
  }


  like(): void {
    // adds/removes logged user id to likes array of this users profile
    if (this.liking) {
      this._removeEntry(this._likes, this.loggedInUser);
    } else {
      this._likes.push(this.loggedInUser);
    }
    this._checkIfLikes();
  }

  private _checkIfLikes() {
    this.liking = this._likes.includes(this.loggedInUser);
  }

  private _removeEntry(array: any[], item: any) {
    // removes entry of arrat by item
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  share() {
    // launches popupshare popup
    this.togglePopupShare();
  }

  // // comments
  addOnEnter(event, content: string) {
    // when enter is pressed adds comment to comments in service
    if (event.keyCode === 13) {
      event.preventDefault();
      this.addComment(content);
    }
  }

  addComment(content) {
    //  adds comment to comments in service
    if (content) {
      const now = Date.now();
      this._dataService.comments.push(
        new Comment(this._id, this.loggedInUser, 5, now, content)
      );
      this._dataService.updateCommentSubject();
    }
    this.clearInput();
    this._commentsBodyScrollTop();
    this._sortCommentsByTime();
  }

  clearInput() {
    // clears 'input' area of add comment
    this.commentInput.nativeElement.innerHTML = '';
  }

  private _commentsBodyScrollTop() {
    // when comment is added scrolls to top to see comment
    this.commentsBody.nativeElement.scrollTop = 0;
  }

  private _sortCommentsByTime() {
    //  sorts comments by time whey where added earliest to latest
    return this._comments.sort((a, b) => {
      const dateA = a.publishDate;
      const dateB = b.publishDate;
      return dateA < dateB;
    });
  }

  toggleLabel(opacity) {
    //  toggles 'input' label opacity of add comment
    this.commentInputLabel.nativeElement.style.opacity = opacity;
  }

  commentsVisibilityToggle() {
    //  toggles visibility of comments
    this.commentsVisible = !this.commentsVisible;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../_models/_user';
import { Comment } from '../_models/_comment';
import { Like } from '../_models/_like';
import { Follow } from '../_models/_follow';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataUrl = '/assets/data.json';

  follow;
  follow$ = new Subject();

  users;
  users$ = new Subject();

  likes;
  likes$ = new Subject();

  comments;
  comments$ = new Subject();

  constructor(
    private _http: HttpClient,
  ) { }

  getData(id?: number) {
    // return new Promise((res, rej) => {
      this._data().subscribe(
        (data: { comments: any[], likes: any[], users: any[], follows: any[] }) => {
          this.users = data.users.map(u => {
            return new User(u.id, u.first_name, u.last_name, u.location, u.avatar, u.webpage);
          });
          this.users$.next(this.users);

          this.likes = data.likes.map(l => {
            return new Like(l.user_id, l.likes, l.liked);
          });
          this.likes$.next(this.likes);

          this.comments = data.comments.map(c => {
            return new Comment(c.user_id, c.author_id, c.id, c.publish_date, c.content);
          });
          this.updateCommentSubject();

          this.follow = data.follows.map(f => {
            return new Follow(f.user_id, f.follows, f.following);
          });
          this.follow$.next(this.follow);
          // res();
        },
        err => {
          console.log(err);
          // rej();
        }
      );
    // })
  }

  private _data() {
    return this._http.get(this.dataUrl);
  }

  getUser(id) {
    return this.users.filter(x => x.id === id)[0];
  }

  updateCommentSubject() {
    this.comments$.next(this.comments);
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../_services/data.service';
import { UserProfileComponent } from './user-profile.component';
import { DateSpreadPipe } from '../_pipes/date-spread.pipe';
import { User } from '../_models/_user';
import { of, Observable } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';
import { variable } from '@angular/compiler/src/output/output_ast';


class MockDataService {

    follow = [{
        'userId': 1,
        'follows': [1, 2, 3, 4, 5],
        'following': [1, 2, 3, 4, 6]
    }];

    users = [{
        'id': 1,
        'firstName': 'Carolee',
        'lastName': 'Hawthorn',
        'location': '8288 Lawn Alley',
        'avatar': 'http://dummyimage.com/163x163.jpg/5fa2dd/ffffff',
        'webpage': 'https://indiatimes.com'
    },
    {
        'id': 5,
        'firstName': 'Carolee',
        'lastName': 'Hawthorn',
        'location': '8288 Lawn Alley',
        'avatar': 'http://dummyimage.com/163x163.jpg/5fa2dd/ffffff',
        'webpage': 'https://indiatimes.com'
    }];

    likes = [{
        'userId': 1,
        'likes': [2, 3, 4],
        'liked': [1, 2, 3, 4]
    }];

    comments = [{
        'userId': 1,
        'authorId': 5,
        'id': 1,
        'publishDate': '2017-06-13',
        'content': '1 comment'
    },
    {
        'userId': 1,
        'authorId': 5,
        'id': 2,
        'publishDate': '2017-09-18',
        'content': '2 comment'
    }];


    follow$ = of(this.follow);
    users$ = of(this.users);
    likes$ = of(this.likes);
    comments$ = of(this.comments);

    getData() {
        return new Promise(res => {
            res({});
        });
    }

    getUser(id) {
        return this.users.filter(x => x.id === id)[0];
    }

    updateCommentSubject() {
        return null;
    }
}

describe('UserProfileComponent', () => {
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;
    let service: DataService;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserProfileComponent, DateSpreadPipe],
            providers: [
                { provide: DataService, useClass: MockDataService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        service = TestBed.get(DataService);

        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        component.userProfileId = 1;
        component.loggedUserId = 5;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('@Input()', () => {
        it('userProfileId should be defined', () => {
            expect(component.userProfileId).toBeDefined();
        });

        it('loggedUserId should be defined', () => {
            expect(component.loggedUserId).toBeDefined();
        });
    });

    describe('public Variables', () => {
        it('commentsVisible should be truthy', () => {
            expect(component.commentsVisible).toBeTruthy();
        });
        it('popupShare shoul be falsy', () => {
            expect(component.popupShare).toBeFalsy();
        });
    });

    // // class related
    describe('#get id()', () => {
        it('should return number', () => {
            expect(component.id).toEqual(jasmine.any(Number));
        });
        it('should return number > 0', () => {
            expect(component.id).toBeGreaterThan(0);
        });
        it('should return number thats equal to user.id', () => {
            expect(component.id).toBe(component.userProfileId);
        });
    });
    describe('#get name()', () => {

        it('should return string', () => {
            expect(component.name).toEqual(jasmine.any(String));
        });
        it('should return string thats equal to "Carolee"', () => {
            expect(component.name).toBe('Carolee');
        });
    });
    describe('#get surname()', () => {

        it('should return string', () => {
            expect(component.surname).toEqual(jasmine.any(String));
        });
        it('should return string thats equal to "Hawthorn"', () => {
            expect(component.surname).toBe('Hawthorn');
        });
    });
    describe('#get location()', () => {

        it('should return string', () => {
            expect(component.location).toEqual(jasmine.any(String));
        });
        it('should return string thats equal to "8288 Lawn Alley"', () => {
            expect(component.location).toBe('8288 Lawn Alley');
        });
    });
    describe('#get avatar()', () => {

        it('should return string', () => {
            expect(component.avatar).toEqual(jasmine.any(String));
        });
        it('should return string thats equal to "http://dummyimage.com/163x163.jpg/5fa2dd/ffffff"', () => {
            expect(component.avatar).toBe('http://dummyimage.com/163x163.jpg/5fa2dd/ffffff');
        });
    });
    describe('#get webpageUrl()', () => {
        const url = document.URL;

        it('should return string', () => {
            expect(component.webpageUrl).toEqual(jasmine.any(String));
        });
        it(`should return string thats equal to ${url} (document.URL)`, () => {
            expect(component.webpageUrl).toBe(url);
        });
    });

    // comments
    describe('#get comments()', () => {
        it('should be defined', () => {
            expect(component.comments).toBeDefined();
        });
    });
    describe('#get commentsLength()', () => {
        it('should be a number', () => {
            expect(component.commentsLength).toEqual(jasmine.any(Number));
        });
        it('should return length of _comments array', () => {
            expect(component.commentsLength).toEqual(component.comments.length);
        });
    });

    describe('#commentAuthor(id)', () => {
        it('should return Object<User> with id = 5 ', () => {
            expect(component.commentAuthor(5)).toBe(service.users[1]);
        });
    });

    // likes
    describe('#get likes()', () => {
        it('should be a number', () => {
            expect(component.likes).toEqual(jasmine.any(Number));
        });
    });

    // follow
    describe('#get followers()', () => {
        it('should be a number', () => {
            expect(component.followers).toEqual(jasmine.any(Number));
        });
    });

    describe('#get follows()', () => {
        it('should be a number', () => {
            expect(component.follows).toEqual(jasmine.any(Number));
        });
    });


    // actions
    describe('#togglePopupShare()', () => {
        it('should change value of this.popupShare to !this.popupShare', () => {
            const popupShareValue = false;
            component.popupShare = popupShareValue;
            component.togglePopupShare();
            expect(component.popupShare).toBe(!popupShareValue);
        });
    });

    describe('#share()', () => {
        let togglePopupShareSpy;

        it('should call #togglePopupShare()', () => {
            togglePopupShareSpy = spyOn(component, 'togglePopupShare');
            component.share();
            fixture.detectChanges();
            expect(togglePopupShareSpy).toHaveBeenCalled();
        });
    });

    describe('#follow()', () => {
        it('should push logged user id to array => Like.liked in service', () => {
            component.follow();
            fixture.detectChanges();
            expect(service.follow[0].following.length).toBe(6);
            expect(service.follow[0].following.includes(5)).toBeTruthy();
        });
    });

    describe('#like()', () => {
        it('should push logged user id to array => Like.liked in service', () => {
            component.like();
            fixture.detectChanges();
            expect(service.likes[0].liked.length).toBe(5);
            expect(service.likes[0].liked.includes(5)).toBeTruthy();
        });
    });

    // comments

    beforeEach(() => {
        const commenInputLabel = component.commentInputLabel.nativeElement;
        component.commentInput.nativeElement.innerHTML = 'hello world!';
    });

    afterEach(() => {
        component.commentInput.nativeElement.innerHTML = '';
    });

    describe('#addOnEnter', () => {
        it('should add comment when enter is pressed', () => {

        });
    });

    describe('#clearInput()', () => {
        it('should clear add comment input area where user was typing', () => {
            component.clearInput();
            expect(component.commentInput.nativeElement.innerHTML).toBe('');
        });
    });

    describe('#toggleLabel(opacity)', () => {
        it('should hide label when opacity = 0, show label when opacity = 1', () => {
            component.toggleLabel(0);
            expect(Number(component.commentInputLabel.nativeElement.style.opacity)).toBe(0);
            component.toggleLabel(1);
            expect(Number(component.commentInputLabel.nativeElement.style.opacity)).toBe(1);
        });
    });

    describe('#addComment(content)', () => {
        it('should add comment ot array', () => {
            component.addComment(component.commentInput.nativeElement.innerHTML);
            expect(service.comments.length).toBe(3);
        });
    });

    describe('#commentVisibilityToggle()', () => {
        it('should toggle comments in dom', () => {
            fixture.detectChanges();
            component.commentsVisibilityToggle();
            const el = fixture.nativeElement.querySelector('.comment');
            expect(el).toBeNull();
        });
    });

});

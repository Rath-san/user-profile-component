import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { User } from '../_models/_user';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  // let initData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService
      ]
    });
    service = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
    // initData = service.getData();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([DataService], (_service: DataService) => {
    expect(service).toBeTruthy();
  }));

});

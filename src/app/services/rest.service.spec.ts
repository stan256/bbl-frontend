import { TestBed } from '@angular/core/testing';

import { RestService } from './rest.service';

describe('RestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestService = TestBed.inject(RestService);
    expect(service).toBeTruthy();
  });
});

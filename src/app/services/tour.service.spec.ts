import { TestBed } from '@angular/core/testing';

import { TourService } from './tour.service';

describe('TourService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TourService = TestBed.inject(TourService);
    expect(service).toBeTruthy();
  });
});

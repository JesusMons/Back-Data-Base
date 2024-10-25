import { TestBed } from '@angular/core/testing';

import { PublicationTypesService } from './publication-types.service';

describe('PublicationTypesService', () => {
  let service: PublicationTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicationTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

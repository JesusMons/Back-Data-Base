import { TestBed } from '@angular/core/testing';

import { InvestigationGruopService } from './investigation-gruop.service';

describe('InvestigationGruopService', () => {
  let service: InvestigationGruopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestigationGruopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EstaVisibleService } from './esta-visible.service';

describe('EstaVisibleService', () => {
  let service: EstaVisibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstaVisibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

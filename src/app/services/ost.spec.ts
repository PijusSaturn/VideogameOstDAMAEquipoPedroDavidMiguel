import { TestBed } from '@angular/core/testing';

import { Ost } from './ost';

describe('Ost', () => {
  let service: Ost;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ost);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

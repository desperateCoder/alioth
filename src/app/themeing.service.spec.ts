import { TestBed } from '@angular/core/testing';

import { ThemeingService } from './themeing.service';

describe('ThemeingService', () => {
  let service: ThemeingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

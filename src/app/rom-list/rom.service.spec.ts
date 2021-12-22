import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { RomService } from './rom.service';

describe('RomService', () => {
  let service: RomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(RomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

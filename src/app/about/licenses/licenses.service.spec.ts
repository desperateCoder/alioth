import { LicensesService } from './licenses.service';

describe('LicensesService', () => {
  let service: LicensesService;

  beforeEach(() => {
    service = new LicensesService(false, {} as any, {} as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

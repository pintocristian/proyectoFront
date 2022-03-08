import { TestBed } from '@angular/core/testing';

import { ServiceRealTimeService } from './service-real-time.service';

describe('ServiceRealTimeService', () => {
  let service: ServiceRealTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRealTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

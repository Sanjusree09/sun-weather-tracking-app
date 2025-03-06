import { TestBed } from '@angular/core/testing';

import { WeatherSunService } from './weather-sun.service';

describe('WeatherSunService', () => {
  let service: WeatherSunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherSunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

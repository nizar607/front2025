import { TestBed } from '@angular/core/testing';

import { Room3DService } from './room-3d.service';

describe('Room3DService', () => {
  let service: Room3DService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Room3DService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

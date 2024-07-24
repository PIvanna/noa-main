import { TestBed } from '@angular/core/testing';
import { Storage } from '@angular/fire/storage';

import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: {} },
      ]
    });
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

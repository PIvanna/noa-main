import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientModule} from '@angular/common/http'; // Додали HttpClientModule

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


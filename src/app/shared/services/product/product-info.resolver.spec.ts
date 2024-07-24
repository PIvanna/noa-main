import { TestBed } from '@angular/core/testing';

import { ProductInfoResolver } from './product-info.resolver';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ProductInfoResolver', () => {
  let resolver: ProductInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductInfoResolver],
      imports: [
        HttpClientTestingModule // Додали HttpClientModule до imports
      ]
    });
    resolver = TestBed.inject(ProductInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

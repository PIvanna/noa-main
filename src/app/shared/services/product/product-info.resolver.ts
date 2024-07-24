import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import { IProductResponse } from '../../interfaces/product/product.interface';
import { ProductService } from './product.service';
import {ICategoryResponse} from "../../interfaces/category/category.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver implements Resolve<IProductResponse> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<IProductResponse> {
    const productId = route.paramMap.get('id');
    if (!productId) {
      // Return an empty observable if the productId is null or undefined
      return new Observable<IProductResponse>();
    }

    return this.productService.getOneFirebase(productId).pipe(
      map((data: any) => {
        // Assuming data contains necessary properties like id, name, etc.
        return {
          id: data.id,
          category: data.category,
          name: data.name,
          path: data.path,
          description: data.description,
          weight: data.weight,
          price: data.price,
          imagePath: data.imagePath,
          count: data.count,
        } as IProductResponse;
      })
    );
  }
}

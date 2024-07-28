import { Component } from '@angular/core';
import { IProductResponse } from '../shared/interfaces/product/product.interface';
import { Subscription } from 'rxjs';
import { ProductService } from '../shared/services/product/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OrderService } from '../shared/services/order/order.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public userProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    public orderService: OrderService,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
  }


  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllFirebase().subscribe(data => {
      this.userProducts = data.filter(product => product['category']?.path === categoryName) as IProductResponse[];
    })
  }

  ngOnDestroy(): void {
      this.eventSubscription.unsubscribe();
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }


}

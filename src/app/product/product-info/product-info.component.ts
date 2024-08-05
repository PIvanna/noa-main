import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  public categories: Array<ICategoryResponse> = [];
  public currentProduct!: IProductResponse;
  public userProducts: Array<IProductResponse> = [];
  public sliderItemWidth = 310;
  private eventSubscription!: Subscription;
  private currentIndex: number = 0;
  public translateX: number = 0;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadCategories();
      }
    });
    this.updateSliderItemWidth();
  }

  ngOnInit(): void {
    if (this.activatedRoute.data) {
      this.activatedRoute.data.subscribe(response => {
        this.currentProduct = response['productInfo'];
        this.loadProductsForCurrentCategory();
      });
    }
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe(categories => {
      this.categories = categories as ICategoryResponse[];
    });
  }

  

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  updateSliderItemWidth(): void {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 480) {
      this.sliderItemWidth = window.innerWidth + 10;
    } else if (windowWidth <= 600) {
      this.sliderItemWidth = 330;
    } else if (windowWidth <= 700) {
      this.sliderItemWidth = 400;
    } else if (windowWidth <= 800) {
      this.sliderItemWidth = 420;
    } else if (windowWidth <= 900) {
      this.sliderItemWidth = 450;
    } else if (windowWidth <= 1000) {
      this.sliderItemWidth = 490;
    } else if (windowWidth <= 1200) {
      this.sliderItemWidth = 330;
    } else if (windowWidth <= 1365) {
      this.sliderItemWidth = 380;
    } else if (windowWidth <= 1490) {
      this.sliderItemWidth = 310;
    } else {
      this.sliderItemWidth = 330;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateSliderItemWidth();
  }

  nextSlide(): void {
    if (this.currentIndex < this.userProducts.length - 1) {
      this.currentIndex++;
      this.translateX -= this.sliderItemWidth;
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.translateX += this.sliderItemWidth;
    }
  }

  loadProductsForCurrentCategory(): void {
    if (this.currentProduct && this.currentProduct.category) {
      const categoryPath = this.currentProduct.category.path;
      this.productService.getAllFirebase().subscribe(products => {
        this.userProducts = (products as IProductResponse[]).filter(product => 
          product.category?.path === categoryPath && product.id !== this.currentProduct.id
        );
      });
    }
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }
}

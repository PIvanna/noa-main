import { Component, HostListener, OnDestroy } from '@angular/core';
import { ICategoryResponse } from '../shared/interfaces/category/category.interface';
import { Subscription } from 'rxjs';
import { CategoryService } from '../shared/services/category/category.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OrderService } from '../shared/services/order/order.service';
import { ProductService } from '../shared/services/product/product.service';
import { IProductResponse } from '../shared/interfaces/product/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  public categories: Array<ICategoryResponse> = [];
  private eventSubscription!: Subscription;
  public userProducts: Array<IProductResponse> = [];
  public contentOpen = false;
  public sliderItemWidth = 310;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    public orderService: OrderService, 
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadCategories();
      }
    });
    this.updateSliderItemWidth();
  }

  openContent() {
    this.contentOpen = true;
  }

  closeContent() {
    this.contentOpen = false;
  }
  private currentIndex: number = 0;
  public translateX: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateSliderItemWidth();
  }

  updateSliderItemWidth(): void {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 480) {
      this.sliderItemWidth = window.innerWidth +10;
    } 
     else if (windowWidth <= 600) {
      this.sliderItemWidth = 330;
    } 
    else if (windowWidth <= 700) {
      this.sliderItemWidth = 400;
    } 
    else if (windowWidth <= 800) {
      this.sliderItemWidth = 420;
    } 
    else if (windowWidth <= 900) {
      this.sliderItemWidth = 450;
    } 
    else if (windowWidth <= 1000) {
      this.sliderItemWidth = 490;
    } 
     else if (windowWidth <= 1200) {
      this.sliderItemWidth = 330;
    } 
    else if (windowWidth <= 1365) {
      this.sliderItemWidth = 380;
    } 
    else if (windowWidth <= 1490) {
      this.sliderItemWidth = 310;
    } else {
      this.sliderItemWidth = 330; // Example for larger screens
    }
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

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe(categories => {
      this.categories = categories as ICategoryResponse[];
      this.loadProductsForNoaShop();
    });
  }

  loadProductsForNoaShop(): void {
    this.productService.getAllFirebase().subscribe(products => {
      const allProducts = products as IProductResponse[];

      const noaShopCategory = this.categories.find(category => category.name === 'Noa Shop');

      if (noaShopCategory) {
        this.userProducts = this.getRandomProducts(
          allProducts.filter(product => product.category?.path !== noaShopCategory.path),
          4
        );
      } else {
        this.userProducts = this.getRandomProducts(allProducts, 4);
      }
    });
  }

  private getRandomProducts(products: IProductResponse[], count: number): IProductResponse[] {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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

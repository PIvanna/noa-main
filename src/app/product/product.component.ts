import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('selectRef') selectRef!: ElementRef<HTMLSelectElement>;

  

  
  ngAfterViewInit(): void {
    // Get the current URL path
    const currentPath = this.router.url;

    // Get the select element
    const selectElement = this.selectRef.nativeElement;

    // Find and select the option that matches the current URL
    for (let i = 0; i < selectElement.options.length; i++) {
      if (selectElement.options[i].value === currentPath) {
        selectElement.selectedIndex = i;
        break;
      }
    }
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;

    if (selectElement.textContent) {
      selectElement.title = selectedText;
    }

    this.router.navigate([selectedValue]);
    console.log(selectElement.title);
    console.log('Selected Text:', selectedText);
  }

  

}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public categories: Array<ICategoryResponse> = [];
  private eventSubscription!: Subscription;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<MenuComponent>

  ) {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe(categories => {
      this.categories = categories as ICategoryResponse[];
      console.log(categories);
    });
  }

  navigateToCategory(path: string): void {
    this.router.navigate(['/product', path]).then(() => {
      this.dialogRef.close();

    });
  }

}

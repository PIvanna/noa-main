import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  constructor(
    private dialogRef: MatDialogRef<MenuComponent>

  ) {
  }
  navigateToCategory() {
    this.dialogRef.close();
  }
}

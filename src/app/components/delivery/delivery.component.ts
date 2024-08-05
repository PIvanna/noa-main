import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {
  public deliveryStatus = true;
  public selfStatus = false;
  public adressForm!: FormGroup;
  public selfForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DeliveryComponent>

  ) { }

  ngOnInit(): void {
    this.initadressForm();
    this.initSelfForm();
  }

  initadressForm(): void {
    this.adressForm = this.fb.group({
      type: ['Доставка', Validators.required],
      city: ['', Validators.required],
      adress: ['', Validators.required],
      house: ['', Validators.required]
    });

  }

  initSelfForm() {
    this.selfForm = this.fb.group({
      type: ['Самовивіз', Validators.required],
      restaurant: ['', Validators.required]
    });
  }



  deliveryOpen() {
    this.deliveryStatus = true;
    this.selfStatus = false;
  }

  selfOpen() {
    this.deliveryStatus = false;
    this.selfStatus = true;
  }



  onSubmitDeliveryForm(): void {
    if (this.adressForm.valid) {
      const formData = this.adressForm.value;
      localStorage.setItem('deliveryData', JSON.stringify(formData));
      console.log('Delivery data saved:', formData);
      this.dialogRef.close();
      window.location.reload();


    }

    
  }

  
  

  onSubmitSelfForm(): void {
    if (this.selfForm.valid) {
      const formData = this.selfForm.value;
      localStorage.setItem('selfData', JSON.stringify(formData));
      console.log('Self-pickup data saved:', formData);
      this.dialogRef.close();
      window.location.reload();

    }
  }
}

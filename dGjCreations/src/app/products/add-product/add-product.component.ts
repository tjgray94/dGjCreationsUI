import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public submitted = false;
  public product: Product = {
    name: '',
    price: 0,
    quantity: 0
  };

  constructor(private productService: ProductService, private dialogRef: MatDialogRef<AddProductComponent>) { }

  ngOnInit(): void {
  }
  
  public saveProduct(): void {
    const data = {
      name: this.product.name,
      price: this.product.price,
      quantity: this.product.quantity
    }
    this.productService.addProduct(data).subscribe(response => {
      this.submitted = true;
    })
  }

  public addAnotherProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      price: 0,
      quantity: 0
    }
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public closeDialogAndRefresh(): void {
    this.dialogRef.close();
    location.reload();
  }
}

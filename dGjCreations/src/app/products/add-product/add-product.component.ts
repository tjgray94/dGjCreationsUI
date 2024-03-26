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
    quantity: 0,
    image: ''
  };
  public selectedImage = null;

  constructor(private productService: ProductService, private dialogRef: MatDialogRef<AddProductComponent>) { }

  ngOnInit(): void {
  }
  
  public saveProduct(): void {
    // if (!this.selectedImage) {
    //   return;
    // }
    const data = new FormData();
    data.append('selectedImage', this.selectedImage);
    data.append('name', this.product.name);
    data.append('price', String(this.product.price));
    data.append('quantity', String(this.product.quantity));
    // const data = {
    //   name: this.product.name,
    //   price: this.product.price,
    //   quantity: this.product.quantity,
    //   image: this.selectedImage
    // }
    this.productService.addProduct(data).subscribe(response => {
      this.submitted = true;
    })
  }

  public onImageSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  public addAnotherProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      price: 0,
      quantity: 0,
      image: ''
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

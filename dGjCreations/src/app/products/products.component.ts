import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products!: Product[];
  public displayedColumns: string[] = ['name', 'action'];

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    })
  }

  public addProductDialog() {
    this.dialog.open(AddProductComponent);
  }

  public deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({ next:() => this.products = this.products.filter(product => product.productId !== id) });
  }
}

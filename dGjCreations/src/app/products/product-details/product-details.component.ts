import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';
import { BadgeService } from 'src/app/badge.service';
import { CartService } from 'src/app/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartDialogComponent } from 'src/app/add-to-cart-dialog/add-to-cart-dialog.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public currentProduct: Product = {
    name: '',
    price: 0,
    quantity: 0
  };
  public productId: number = 0;
  public id!: number;
  @Input() product!: Product;
  public panelOpenState = false;

  constructor(private productService: ProductService,
              private badgeService: BadgeService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['productId'];
    this.productService.getProduct(this.id).subscribe(data => {
      this.product = data;
    })
  }

  public viewProduct(id: number): void {
    this.productService.getProduct(id).subscribe(data => {
      this.currentProduct = data;
    })
  }

  public updateProduct(): void {
    this.router.navigate(['/products', this.id, 'edit']);
  }

  public deleteProduct(): void {
    this.productService.deleteProduct(this.product.productId).subscribe(response => {
      this.router.navigate(['/products']);
    });
  }

  public addProductToCart(name: string, price: number): void {
    this.badgeService.incrementBadgeCount();
    this.cartService.addToCart(name, price);
    this.dialog.open(AddToCartDialogComponent);
  }

  public onBack(): void {
    this.router.navigate(['/products']);
  }
}

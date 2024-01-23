import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public id!: number;
  public product!: Product;
  @ViewChild('productForm') form!: NgForm;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['productId'];
    this.productService.getProduct(this.id).subscribe(data => {
      this.product = data;
    })
  }

  submit(){
    this.productService.updateProduct(this.id, this.form.value).subscribe(res => {
      this.router.navigateByUrl('/products')
    })
  }
}

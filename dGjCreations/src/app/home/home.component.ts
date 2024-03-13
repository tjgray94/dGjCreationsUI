import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartDialogComponent } from '../add-to-cart-dialog/add-to-cart-dialog.component';
import { LoginService } from '../login.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private loginService: LoginService) { }

  ngOnInit(): void {
    this.hello();
  }

  openDialog() {
    this.dialog.open(AddToCartDialogComponent)
  }

  hello() {
    this.loginService.hello().subscribe(
      (response) => {
        console.log(response);
      }
    )
  }
}

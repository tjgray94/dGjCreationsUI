import { Component, OnInit } from '@angular/core';
import { BadgeService } from '../badge.service';
import { MatDialog } from '@angular/material/dialog';
import { AddToCartDialogComponent } from '../add-to-cart-dialog/add-to-cart-dialog.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private badgeService: BadgeService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(AddToCartDialogComponent)
  }
}

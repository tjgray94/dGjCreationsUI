import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BadgeService } from '../badge.service';

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.css']
})
export class AddToCartDialogComponent implements OnInit {

  constructor(private badgeService: BadgeService, private router: Router) { }

  ngOnInit(): void {
  }

  public checkout() {
    this.router.navigate(['/cart'])
  }
  
  increaseBadgeCount() {
    this.badgeService.incrementBadgeCount();
  }

  resetBadgeCount() {
    this.badgeService.resetBadgeCount();
  }
}

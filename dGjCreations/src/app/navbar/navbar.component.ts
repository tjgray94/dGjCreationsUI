import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BadgeService } from '../badge.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  badgeCount: number;

  constructor(
    private router: Router,
    private badgeService: BadgeService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) { 
      this.matIconRegistry.addSvgIcon(
        'hamburger', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/hamburger_menu.svg')
      )
      this.matIconRegistry.addSvgIcon(
        'cart', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/cart_icon.svg')
      )
    }

  ngOnInit(): void {
    this.badgeService.badgeCount$.subscribe(count => {
      this.badgeCount = count;
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  redirectToProducts() {
    this.router.navigate(['/products']);
  }

  redirectToPrices() {
    this.router.navigate(['/prices']);
  }

  redirectToOrders() {
    this.router.navigate(['/orders']);
  }

  redirectToCart() {
    this.router.navigate(['/cart']);
  }
}

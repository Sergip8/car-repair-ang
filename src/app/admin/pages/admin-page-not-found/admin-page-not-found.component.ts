import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page-not-found',
  templateUrl: './admin-page-not-found.component.html',
  styleUrls: ['./admin-page-not-found.component.scss']
})
export class AdminPageNotFoundComponent {

  constructor(
    private location: Location,
    private router: Router
  ) {}

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigate(['/admin']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
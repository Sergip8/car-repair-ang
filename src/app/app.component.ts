import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertConfig, AlertService } from '../_core/services/alert.service';
import { Subscription } from 'rxjs';
import { AlertComponent } from "../shared/components/alert/alert.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-car-repair';
  alerts: AlertConfig[] = [];
  private subscription?: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.alerts$.subscribe(
      alerts => this.alerts = alerts
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onAlertClose(id: string) {
    this.alertService.dismiss(id);
  }

  trackByAlertId(index: number, alert: AlertConfig): string {
    return alert.id || index.toString();
  }
}

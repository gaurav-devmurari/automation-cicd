import { Component } from '@angular/core';
import { DesignSystemService } from '@design-system/services/design-system.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private toastr: DesignSystemService) {}
  showToastr() {
    this.toastr.toastr(
      'Title Hello',
      'this is testing message',
      'danger',
      3000
    );
  }
}

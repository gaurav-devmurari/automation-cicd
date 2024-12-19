import { Component } from '@angular/core';
import { LoaderService } from '@common-services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoading = false;
  title = 'automation-cicd';
  mode = '';
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
  getValue(event: string) {
    this.mode = event;
  }
}

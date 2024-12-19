import { Component } from '@angular/core';
import { LoaderService } from '@common-services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  isLoading: boolean = false;
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading$.subscribe((res) => {
      this.isLoading = res;
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent{
  title = 'automation-cicd';
  mode='';
  getValue(event: string) {
    this.mode = event;
  }

}

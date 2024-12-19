import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DesignSystemService {
  private toastSubject = new BehaviorSubject<any>(null);
  toast$ = this.toastSubject.asObservable();

  constructor() {}

  toastr(
    title: string,
    message: string,
    type: 'success' | 'error' | 'info' | 'danger',
    duration: number
  ) {
    const toast = { title, message, type, duration };
    this.toastSubject.next(toast);
  }
}

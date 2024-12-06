import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

enum Toastr {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
}

type ToastrType = `${Toastr}`;

@Component({
  selector: 'aut-toastr',
  templateUrl: './aut-toastr.component.html',
  styleUrl: './aut-toastr.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutToastrComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutToastrComponent {
  @Input() toastrTitle = '';
  @Input() toastrMessage = '';
  @Input() type: ToastrType = 'info';
  @Input() closeButton: boolean;
  @Input() iteration: 'infinite' | 'once' = 'once';
  @Input() time = '';

  constructor(@Attribute('class') public classList: string) {}

  public get toastrClassList(): string[] {
    return [
      'toarst',
      `toarst--${this.type}`,      
      `toarst--${this.iteration}`,
      this.classList,
    ].filter(Boolean);
  }
}

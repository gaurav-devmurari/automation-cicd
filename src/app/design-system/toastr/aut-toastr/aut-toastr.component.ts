import { DesignSystemService } from './../../services/design-system.service';
import { Attribute, Component, Input } from '@angular/core';

enum Toastr {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
}

export type ToastrType = `${Toastr}`;

@Component({
  selector: 'aut-toastr',
  templateUrl: './aut-toastr.component.html',
  styleUrl: './aut-toastr.component.scss',
})
export class AutToastrComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() type: ToastrType = 'info';
  @Input() closeButton = false;
  @Input() duration = 0;
  isToastr = false;

  constructor(
    @Attribute('class') public classList: string,
    private designService: DesignSystemService
  ) {
    this.designService.toast$.subscribe(
      (res: {
        title: string;
        message: string;
        type: ToastrType;
        duration: number;
      }) => {
        if (res) {
          this.isToastr = true;
          this.title = res.title;
          this.message = res.message;
          this.type = res.type;
          this.duration = res.duration;
          setTimeout(() => {
            this.isToastr = false;
          }, this.duration);
        }
      }
    );
  }

  public get toastrClassList(): string[] {
    return ['toarst', `toarst--${this.type}`, this.classList].filter(Boolean);
  }
}

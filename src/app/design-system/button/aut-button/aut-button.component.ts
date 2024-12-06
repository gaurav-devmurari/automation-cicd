import {
  Attribute,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ButtonShapeEnum,
  ButtonSizeEnum,
  ButtonVariantEnum,
  IconPosition,
} from '../models/button.enum';

export type ButtonVariant = `${ButtonVariantEnum}`;
export type ButtonSize = `${ButtonSizeEnum}`;
export type ButtonShape = `${ButtonShapeEnum}`;

@Component({
  selector: 'aut-button',
  templateUrl: './aut-button.component.html',
  styleUrl: './aut-button.component.scss',
})
export class AutButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize;
  @Input() shape: ButtonShape = 'rounded';
  @Input() iconPosition: IconPosition;
  @Input() icon = false;
  @Input() type: 'submit' | 'button';
  @Input() iconURL: string;
  @Input() iconButton = false;
  @Input() stretch = false;
  @Input() disabled = false;
  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output('click') clickEvent = new EventEmitter<Event>();
  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output('focus') focusEvent = new EventEmitter<Event>();
  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output('blur') blurEvent = new EventEmitter<Event>();

  constructor(@Attribute('class') public classList: string) {}

  public get buttonClasses(): string[] {
    return [
      this.iconButton
        ? `btn--${this.variant} p-1 rounded-lg`
        : `btn btn--${this.variant}`,
      this.disabled ? `btn--disabled` : undefined,
      this.disabled ? `btn--${this.variant}--disabled` : undefined,
      this.size ? `btn--${this.size}` : undefined,
      this.shape ? `btn--${this.shape}` : undefined,
      this.classList,
    ].filter(Boolean);
  }

  public get buttonStyles(): Record<string, string> {
    return {
      display: this.icon ? 'flex' : 'inline',
      width: this.stretch ? '100%' : '',
    };
  }
}

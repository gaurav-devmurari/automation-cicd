/* eslint-disable @angular-eslint/no-output-native */
/* eslint-disable @angular-eslint/no-output-rename */
import {
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { InputTypeEnum, InputVariantEnum } from '../models/input.enum';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputVariant = `${InputVariantEnum}`;
export type InputType = `${InputTypeEnum}`;

@Component({
  selector: 'aut-input',
  templateUrl: './aut-input.component.html',
  styleUrl: './aut-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutInputComponent implements ControlValueAccessor {
  @Input() type: InputType = 'text';
  @Input() placeholder: string;
  @Input() disabled = false;
  @Input() variant: InputVariant = 'primary';
  @Input() id = '';
  @Input() name = '';
  @Input() pattern = '';
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output('blur') onBlur = new EventEmitter<string>();
  @Output('input') input = new EventEmitter<string>();

  value = '';

  constructor(
    @Attribute('class') public classList: string,
    private cdr: ChangeDetectorRef
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value !== undefined) {
      this.value = value;
      this.cdr.detectChanges();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onInput();
    }
  }

  onInput() {
    this.onChange(this.value);
    this.onTouched();
    this.input.emit(this.value);
  }

  onBlurEvent() {
    this.onTouched();
    this.onBlur.emit(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public get inputClasses(): string[] {
    return [`input--${this.variant}`, this.classList].filter(Boolean);
  }

  public get labelClasses(): string[] {
    return ['label'];
  }
}

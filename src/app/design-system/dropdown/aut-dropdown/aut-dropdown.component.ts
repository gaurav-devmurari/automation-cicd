import {
  Attribute,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'aut-dropdown',
  templateUrl: './aut-dropdown.component.html',
  styleUrl: './aut-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutDropdownComponent,
      multi: true,
    },
  ],
})
export class AutDropdownComponent implements ControlValueAccessor {
  @Input() to: 'push' | 'pull' | 'pull_request';
  @Input() placeholder = '';
  @Input() hidden = false;
  @Input() options: string[] = ['option1','option2','option3','option4','option5'];
  @Output() emmiter = new EventEmitter<{ array: string; value: string[] }>();
  val: string[] = [];
  value = '';
  isOpen = false;

  constructor(@Attribute('class') public classList: string) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  openDropdown() {
    this.isOpen = !this.isOpen;
    this.val.forEach((element, index) => {
      if(!this.options.includes(element)){
        this.val.splice(index, 1)
        this.value = ''
      }
    });
  }
  selectOption(option: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.value.includes(option)
      ? this.val.splice(this.val.indexOf(option), 1)
      : this.val.push(option);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.val.at(0) == '' ? this.val.splice(0, 1) : null;
    this.value = this.val.toString();
    const a = {
      array: this.to,
      value: this.val,
    };
    this.emmiter.emit(a as { array: string; value: string[] });
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        this.val = value;
        this.value = value.join(',');
      } else if (typeof value === 'string') {
        this.value = value;
        this.val = value.split(',').map((v: string) => v.trim());
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  public get selectClasses(): string[] {
    return ['dropdown', this.classList].filter(Boolean);
  }
}

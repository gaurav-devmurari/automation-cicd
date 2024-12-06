/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-output-rename */
/* eslint-disable @angular-eslint/no-output-native */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  Attribute,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'aut-chip',
  templateUrl: './aut-chip.component.html',
  styleUrls: ['./aut-chip.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutChipComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutChipComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() hidden = false;
  @Input() chips: string[] = [];
  @Output('blur') onBlur = new EventEmitter<Event>();
  @Output('change') onChangeEvent = new EventEmitter<string[]>();
  @Output('keydown') keydown = new EventEmitter<string[]>();
  @Output() updateStages = new EventEmitter<string[]>();
  value = '';

  private onChange: (chips: string[]) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Attribute('class') public classList: string) {}

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const trimmedValue = this.value.trim();
      if (trimmedValue) {
        this.addChip(trimmedValue);
        this.value = '';
      }
    }
  }

  addChip(value: string) {
    this.chips.push(value);
    this.onChange(this.chips);
    this.keydown.emit(this.chips);
    this.updateStages.emit(this.chips);
  }

  removeChip(index: number) {
    this.chips.splice(index, 1);
    this.onChange(this.chips);
    this.updateStages.emit(this.chips);
  }

  writeValue(chips: string[]): void {
    if (chips) {
      this.chips = chips;
    }
  }

  registerOnChange(fn: (chips: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public get inputClasses(): string[] {
    return ['input', this.classList].filter(Boolean);
  }
}

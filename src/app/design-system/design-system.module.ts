import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DesignSystemComponent } from './design-system.component';
import { ButtonComponent } from './button/button.component';
import { IndexComponent } from './index/index.component';
import { AutButtonComponent } from './button/aut-button/aut-button.component';
import { HyperlinkComponent } from './hyperlink/hyperlink.component';
import { AutLinkComponent } from './hyperlink/aut-link/aut-link.component';
import { InputComponent } from './input/input.component';
import { AutInputComponent } from './input/aut-input/aut-input.component';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown/dropdown.component';
import { AutDropdownComponent } from './dropdown/aut-dropdown/aut-dropdown.component';
import { ChipComponent } from './chip/chip.component';
import { AutChipComponent } from './chip/aut-chip/aut-chip.component';
import { ToastrComponent } from './toastr/toastr.component';
import { AutToastrComponent } from './toastr/aut-toastr/aut-toastr.component';
import { CardComponent } from './card/card.component';
import { AutCardComponent } from './card/aut-card/aut-card.component';

const route: Routes = [
  {
    path: '',
    component: DesignSystemComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: 'button',
        component: ButtonComponent,
      },
      {
        path: 'hyperlink',
        component: HyperlinkComponent,
      },
      {
        path: 'input',
        component: InputComponent,
      },
      {
        path: 'dropdown',
        component: DropdownComponent,
      },
      {
        path: 'chipset',
        component: ChipComponent,
      },
      {
        path: 'toastr',
        component: ToastrComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ButtonComponent,
    DesignSystemComponent,
    IndexComponent,
    AutButtonComponent,
    HyperlinkComponent,
    AutLinkComponent,
    InputComponent,
    AutInputComponent,
    DropdownComponent,
    AutDropdownComponent,
    ChipComponent,
    AutChipComponent,
    ToastrComponent,
    AutToastrComponent,
    CardComponent,
    AutCardComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(route), FormsModule],
  exports: [
    AutButtonComponent,
    AutInputComponent,
    AutLinkComponent,
    AutDropdownComponent,
    AutChipComponent,
    AutToastrComponent,
    AutCardComponent,
  ],
})
export class DesignSystemModule {}

import { Component } from '@angular/core';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrl: './toastr.component.scss',
})
export class ToastrComponent {
  toastrType = {
    success:`<aut-toastr
toastrTitle="Success"
toastrMessage="Adipisci amet nemo at officia?"
type="success"
></aut-toastr>`,
    info: `<aut-toastr
toastrTitle="Info"
toastrMessage="Adipisci amet nemo at officia?"
type="info"
></aut-toastr>`,
    warning:`<aut-toastr
toastrTitle="Warning"
toastrMessage="Adipisci amet nemo at officia?"
type="warning"
></aut-toastr>`,
    danger:`<aut-toastr
toastrTitle="Danger"
toastrMessage="Adipisci amet nemo at officia?"
type="danger"
></aut-toastr>`,
  };
}

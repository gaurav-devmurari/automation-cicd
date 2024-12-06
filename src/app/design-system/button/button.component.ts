import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  buttonVariant =`  <aut-button variant='primary'>Primary Button</aut-button>
  <aut-button variant='secondary'>Secondary Button</aut-button>
  <aut-button variant='tertiary'>Tertiary Button</aut-button>
  <aut-button variant='danger'>Danger Button</aut-button>
  <aut-button variant='success'>Success Button</aut-button>`;
  buttonDisabled = `  <aut-button [disabled]="true">Primary Button</aut-button>
  <aut-button [disabled]="true">Secondary Button</aut-button>
  <aut-button [disabled]="true">Tertiary Button</aut-button>`;
  buttonSize = `  <aut-button size="sm">Small Button</aut-button>
  <aut-button>Regular Button</aut-button>
  <aut-button size="md">Medium Button</aut-button>
  <aut-button size="lg">Large Button</aut-button>`;
  buttonShape = `  <aut-button shape="square">Square Button</aut-button>
  <aut-button shape="rounded">Rounded Button</aut-button>
  <aut-button shape="cylinder">Cylinder Button</aut-button>`;
}

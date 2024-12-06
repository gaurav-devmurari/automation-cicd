import { Component } from '@angular/core';

@Component({
  selector: 'app-hyperlink',
  templateUrl: './hyperlink.component.html',
  styleUrl: './hyperlink.component.scss',
})
export class HyperlinkComponent {
  hyperlinkVariant=`  <aut-link> Primary link </aut-link>
  <aut-link variant='secondary'>Secondary link</aut-link>
  <aut-link variant='tertiary'>Tertiary link</aut-link>
  `
}

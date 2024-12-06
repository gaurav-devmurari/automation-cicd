import { Component, Input } from '@angular/core';
import { HyperlinkVariantEnum } from '../models/hyperlink.enum';

export type HyperlinkVariant = `${HyperlinkVariantEnum}`;
@Component({
  selector: 'aut-link',
  templateUrl: './aut-link.component.html',
  styleUrl: './aut-link.component.scss',
})
export class AutLinkComponent {
  @Input() variant: HyperlinkVariant = 'primary';
  @Input() routerLink: string[];
  @Input() href: string;

  get hyperlinkClasses(): string[] {
    return ['link', this.variant ? `link--${this.variant}` : undefined].filter(
      Boolean,
    );
  }
}

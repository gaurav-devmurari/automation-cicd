import { UserLoginService } from './../../../user-login/service/user-login.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderService } from '@common-services/loader.service';
import { DesignSystemService } from '@design-system/services/design-system.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() modeEmmiter = new EventEmitter<string>();
  @ViewChild('dropDwon') dropdown: ElementRef;
  token: string;
  theme = 'Dark Mode';
  themeCheck = true;
  mode = 'dark';
  isOpen = false;

  constructor(
    private renderer: Renderer2,
    private route: Router,
    private userLoginService: UserLoginService,
    @Inject(PLATFORM_ID) private platformId: object,
    private loader: LoaderService,
    private toastr: DesignSystemService
  ) {}

  isHidden = true;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage?.getItem('token');
      this.isHidden = !this.token;
      const nav = document.querySelector('.navbar-fixed-top') as HTMLElement;
      if (nav) {
        document.addEventListener('scroll', () => {
          const scrolled = window.scrollY > nav.offsetHeight;
          nav.classList.toggle('scrolled', scrolled);
        });
      }
    }
    this.userLoginService.token$.subscribe((token) => {
      this.isHidden = !token;
    });
  }

  signOut() {
    this.loader.show();
    localStorage.clear();
    this.toggleMenu();
    this.route.navigate(['']);
    this.isHidden = true;
    this.loader.hide();
    this.toastr.toastr(
      'See you again',
      'You have been logged out!',
      'success',
      3000
    );
  }
  themeIcon = true;
  toggleTheme() {
    this.theme = this.themeCheck == true ? 'Light Mode' : 'Dark Mode';
    this.mode = this.themeCheck == true ? 'dark' : 'light';
    this.modeEmmiter.emit(this.mode);
    this.themeCheck = !this.themeCheck;
    this.toggleMenu();
    this.themeIcon = !this.themeIcon;
  }
  profileMenu = false;
  toggleMenu() {
    this.profileMenu = !this.profileMenu;
  }
}

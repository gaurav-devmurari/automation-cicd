import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutLinkComponent } from './aut-link.component';

describe('AutLinkComponent', () => {
  let component: AutLinkComponent;
  let fixture: ComponentFixture<AutLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

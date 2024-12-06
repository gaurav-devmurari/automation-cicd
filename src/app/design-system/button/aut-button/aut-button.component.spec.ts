import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutButtonComponent } from './aut-button.component';

describe('AutButtonComponent', () => {
  let component: AutButtonComponent;
  let fixture: ComponentFixture<AutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutDropdownComponent } from './aut-dropdown.component';

describe('AutDropdownComponent', () => {
  let component: AutDropdownComponent;
  let fixture: ComponentFixture<AutDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

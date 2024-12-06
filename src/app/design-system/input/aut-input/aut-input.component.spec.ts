import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutInputComponent } from './aut-input.component';

describe('AutInputComponent', () => {
  let component: AutInputComponent;
  let fixture: ComponentFixture<AutInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

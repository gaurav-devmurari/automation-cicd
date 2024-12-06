import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutChipComponent } from './aut-chip.component';

describe('AutChipComponent', () => {
  let component: AutChipComponent;
  let fixture: ComponentFixture<AutChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

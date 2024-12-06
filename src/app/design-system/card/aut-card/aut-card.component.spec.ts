import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutCardComponent } from './aut-card.component';

describe('AutCardComponent', () => {
  let component: AutCardComponent;
  let fixture: ComponentFixture<AutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

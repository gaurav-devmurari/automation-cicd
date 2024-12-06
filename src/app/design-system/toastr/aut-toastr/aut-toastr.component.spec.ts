import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutToastrComponent } from './aut-toastr.component';

describe('AutToastrComponent', () => {
  let component: AutToastrComponent;
  let fixture: ComponentFixture<AutToastrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutToastrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutToastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

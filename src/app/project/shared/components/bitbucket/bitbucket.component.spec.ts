import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitbucketComponent } from './bitbucket.component';

describe('BitbucketComponent', () => {
  let component: BitbucketComponent;
  let fixture: ComponentFixture<BitbucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BitbucketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BitbucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

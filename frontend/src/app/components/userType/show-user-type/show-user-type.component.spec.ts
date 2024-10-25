import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserTypeComponent } from './show-user-type.component';

describe('ShowUserTypeComponent', () => {
  let component: ShowUserTypeComponent;
  let fixture: ComponentFixture<ShowUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowUserTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserTypeComponent } from './create-user-type.component';

describe('CreateUserTypeComponent', () => {
  let component: CreateUserTypeComponent;
  let fixture: ComponentFixture<CreateUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

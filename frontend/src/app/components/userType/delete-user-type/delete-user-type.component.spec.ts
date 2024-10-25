import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserTypeComponent } from './delete-user-type.component';

describe('DeleteUserTypeComponent', () => {
  let component: DeleteUserTypeComponent;
  let fixture: ComponentFixture<DeleteUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUserTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

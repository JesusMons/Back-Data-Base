import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProgramComponent } from './delete-program.component';

describe('DeleteProgramComponent', () => {
  let component: DeleteProgramComponent;
  let fixture: ComponentFixture<DeleteProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

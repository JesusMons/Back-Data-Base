import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGruopComponent } from './delete-gruop.component';

describe('DeleteGruopComponent', () => {
  let component: DeleteGruopComponent;
  let fixture: ComponentFixture<DeleteGruopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGruopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGruopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

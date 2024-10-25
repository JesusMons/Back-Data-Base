import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGruopComponent } from './create-gruop.component';

describe('CreateGruopComponent', () => {
  let component: CreateGruopComponent;
  let fixture: ComponentFixture<CreateGruopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGruopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGruopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

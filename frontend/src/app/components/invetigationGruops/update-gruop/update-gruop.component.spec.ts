import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGruopComponent } from './update-gruop.component';

describe('UpdateGruopComponent', () => {
  let component: UpdateGruopComponent;
  let fixture: ComponentFixture<UpdateGruopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGruopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGruopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

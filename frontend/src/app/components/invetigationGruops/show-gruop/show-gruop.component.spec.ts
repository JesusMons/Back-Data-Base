import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGruopComponent } from './show-gruop.component';

describe('ShowGruopComponent', () => {
  let component: ShowGruopComponent;
  let fixture: ComponentFixture<ShowGruopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowGruopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowGruopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

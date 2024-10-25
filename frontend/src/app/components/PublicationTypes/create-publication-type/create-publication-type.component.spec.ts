import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublicationTypeComponent } from './create-publication-type.component';

describe('CreatePublicationTypeComponent', () => {
  let component: CreatePublicationTypeComponent;
  let fixture: ComponentFixture<CreatePublicationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePublicationTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePublicationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

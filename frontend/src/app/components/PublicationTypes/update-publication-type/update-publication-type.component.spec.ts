import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePublicationTypeComponent } from './update-publication-type.component';

describe('UpdatePublicationTypeComponent', () => {
  let component: UpdatePublicationTypeComponent;
  let fixture: ComponentFixture<UpdatePublicationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePublicationTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePublicationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePublicationTypeComponent } from './delete-publication-type.component';

describe('DeletePublicationTypeComponent', () => {
  let component: DeletePublicationTypeComponent;
  let fixture: ComponentFixture<DeletePublicationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePublicationTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePublicationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

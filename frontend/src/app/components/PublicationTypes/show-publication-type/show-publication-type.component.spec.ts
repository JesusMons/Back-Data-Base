import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPublicationTypeComponent } from './show-publication-type.component';

describe('ShowPublicationTypeComponent', () => {
  let component: ShowPublicationTypeComponent;
  let fixture: ComponentFixture<ShowPublicationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPublicationTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPublicationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

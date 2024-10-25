import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteKeywordsComponent } from './delete-keywords.component';

describe('DeleteKeywordsComponent', () => {
  let component: DeleteKeywordsComponent;
  let fixture: ComponentFixture<DeleteKeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteKeywordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

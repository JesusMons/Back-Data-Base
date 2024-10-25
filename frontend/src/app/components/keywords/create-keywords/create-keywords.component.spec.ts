import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKeywordsComponent } from './create-keywords.component';

describe('CreateKeywordsComponent', () => {
  let component: CreateKeywordsComponent;
  let fixture: ComponentFixture<CreateKeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateKeywordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowKeywordsComponent } from './show-keywords.component';

describe('ShowKeywordsComponent', () => {
  let component: ShowKeywordsComponent;
  let fixture: ComponentFixture<ShowKeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowKeywordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

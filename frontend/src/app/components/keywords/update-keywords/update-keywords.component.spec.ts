import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKeywordsComponent } from './update-keywords.component';

describe('UpdateKeywordsComponent', () => {
  let component: UpdateKeywordsComponent;
  let fixture: ComponentFixture<UpdateKeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateKeywordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

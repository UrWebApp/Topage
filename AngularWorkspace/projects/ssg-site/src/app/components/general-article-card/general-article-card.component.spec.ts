import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralArticleCardComponent } from './general-article-card.component';

describe('GeneralArticleCardComponent', () => {
  let component: GeneralArticleCardComponent;
  let fixture: ComponentFixture<GeneralArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralArticleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

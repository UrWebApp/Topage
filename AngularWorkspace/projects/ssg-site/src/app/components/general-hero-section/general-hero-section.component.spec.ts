import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralHeroSectionComponent } from './general-hero-section.component';

describe('GeneralHeroSectionComponent', () => {
  let component: GeneralHeroSectionComponent;
  let fixture: ComponentFixture<GeneralHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralHeroSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

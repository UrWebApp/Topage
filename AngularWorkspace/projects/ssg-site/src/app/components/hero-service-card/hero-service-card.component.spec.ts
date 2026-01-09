import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroServiceCardComponent } from './hero-service-card.component';

describe('HeroServiceCardComponent', () => {
  let component: HeroServiceCardComponent;
  let fixture: ComponentFixture<HeroServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroServiceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

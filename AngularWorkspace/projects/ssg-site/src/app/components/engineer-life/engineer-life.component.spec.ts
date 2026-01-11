import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerLifeComponent } from './engineer-life.component';

describe('EngineerLifeComponent', () => {
  let component: EngineerLifeComponent;
  let fixture: ComponentFixture<EngineerLifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngineerLifeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

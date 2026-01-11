import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemServicePageComponent } from './system-service-page.component';

describe('SystemServicePageComponent', () => {
  let component: SystemServicePageComponent;
  let fixture: ComponentFixture<SystemServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemServicePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

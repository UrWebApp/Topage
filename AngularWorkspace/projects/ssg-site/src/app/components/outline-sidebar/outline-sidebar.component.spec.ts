import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlineSidebarComponent } from './outline-sidebar.component';

describe('OutlineSidebarComponent', () => {
  let component: OutlineSidebarComponent;
  let fixture: ComponentFixture<OutlineSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutlineSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutlineSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

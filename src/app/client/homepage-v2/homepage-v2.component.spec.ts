import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageV2Component } from './homepage-v2.component';

describe('HomepageV2Component', () => {
  let component: HomepageV2Component;
  let fixture: ComponentFixture<HomepageV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

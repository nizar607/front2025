import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Room3dComponent } from './room3d.component';

describe('Room3dComponent', () => {
  let component: Room3dComponent;
  let fixture: ComponentFixture<Room3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Room3dComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Room3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

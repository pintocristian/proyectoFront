import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeyhookeComponent } from './leyhooke.component';

describe('LeyhookeComponent', () => {
  let component: LeyhookeComponent;
  let fixture: ComponentFixture<LeyhookeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeyhookeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeyhookeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

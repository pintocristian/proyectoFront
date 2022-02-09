import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovparabolicoComponent } from './movparabolico.component';

describe('MovparabolicoComponent', () => {
  let component: MovparabolicoComponent;
  let fixture: ComponentFixture<MovparabolicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovparabolicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovparabolicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaidalibreComponent } from './caidalibre.component';

describe('CaidalibreComponent', () => {
  let component: CaidalibreComponent;
  let fixture: ComponentFixture<CaidalibreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaidalibreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaidalibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

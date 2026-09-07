import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Decretos } from './decretos';

describe('Decretos', () => {
  let component: Decretos;
  let fixture: ComponentFixture<Decretos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Decretos],
    }).compileComponents();

    fixture = TestBed.createComponent(Decretos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

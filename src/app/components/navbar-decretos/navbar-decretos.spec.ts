import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDecretos } from './navbar-decretos';

describe('NavbarDecretos', () => {
  let component: NavbarDecretos;
  let fixture: ComponentFixture<NavbarDecretos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarDecretos],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarDecretos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecretosUsuario } from './decretos-usuario';

describe('DecretosUsuario', () => {
  let component: DecretosUsuario;
  let fixture: ComponentFixture<DecretosUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecretosUsuario],
    }).compileComponents();

    fixture = TestBed.createComponent(DecretosUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFiltros } from './sidebar-filtros';

describe('SidebarFiltros', () => {
  let component: SidebarFiltros;
  let fixture: ComponentFixture<SidebarFiltros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarFiltros],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarFiltros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
